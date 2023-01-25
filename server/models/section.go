package models

import (
	"github.com/team/swe-project/middleware"
)

type Section struct {
	SectionID   uint8  `json:"section_id" gorm:"primary_key"`
	SectionName string `json:"section_name"`
}

func GetAllSections() []Section {
	var sections []Section

	middleware.DB.Find(&sections)

	return sections
}

func GetSectionByID(section_id uint8) Section {
	var section Section

	middleware.DB.First(&section, section_id)

	return section
}
