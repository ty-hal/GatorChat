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

func (s *Section) GetThreads() []Thread {
	var threads []Thread

	for _, thread := range GetAllThreads() {
		if thread.SectionID == s.SectionID {
			threads = append(threads, thread)
		}
	}

	return threads
}
