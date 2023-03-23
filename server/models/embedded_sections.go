package models

import (
	"fmt"

	"github.com/team/swe-project/middleware"
)

type EmbeddedSections struct {
	SectionEmbedID  uint8 `json:"section_embed_id" gorm:"primary_key"`
	SectionParentID uint8 `json:"section_parent_id,omitempty"`
	GroupChildID    uint  `json:"group_child_id,omitempty"`
}

func GetChildGroup(sectionID uint8) []Section {
	var embeddedSection EmbeddedSections

	middleware.DB.First(&embeddedSection, "section_parent_id = ?", sectionID)

	return GetSectionsByGroup(embeddedSection.GroupChildID)
}

func GetParentGroup(groupID uint) []Section {
	var embeddedSection EmbeddedSections

	middleware.DB.First(&embeddedSection, "group_child_id = ?", groupID)

	section, err := GetSectionByID(embeddedSection.SectionParentID)

	if err != nil {
		fmt.Println(err.Error())
	}

	return GetSectionsByGroup(section.GroupID)
}
