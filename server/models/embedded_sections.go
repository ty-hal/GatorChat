package models

import (
	"github.com/team/swe-project/middleware"
)

type EmbeddedSections struct {
	SectionEmbedID  uint8 `json:"section_embed_id" gorm:"primary_key"`
	SectionParentID uint8 `json:"section_parent_id,omitempty"`
	SectionChildID  uint8 `json:"section_child_id,omitempty"`
}

func GetAllEmbeddedSectionRows() []EmbeddedSections {
	var embeddedSections []EmbeddedSections

	middleware.DB.Find(&embeddedSections)

	return embeddedSections
}

func GetChildSections(sectionID uint8) []Section {
	var embeddedSectionsRows []EmbeddedSections
	var childSections []Section

	middleware.DB.Find(&embeddedSectionsRows, "section_parent_id = ?", sectionID)

	for _, embeddedSections := range embeddedSectionsRows {
		if embeddedSections.SectionParentID == sectionID {
			section, err := GetSectionByID(embeddedSections.SectionChildID)
			if err == nil {
				childSections = append(childSections, section)
			}
		}
	}

	return childSections
}
