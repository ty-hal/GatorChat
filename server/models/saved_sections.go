package models

import (
	"github.com/team/swe-project/middleware"
)

type SavedSections struct {
	SavedSectionID uint8 `json:"saved_section_id" gorm:"primary_key"`
	UserID         uint8 `json:"user_id,omitempty"`
	SectionID      uint8 `json:"section_id,omitempty"`
}

func GetAllSavedSectionRows() []SavedSections {
	var savedSections []SavedSections

	middleware.DB.Find(&savedSections)

	return savedSections
}

func GetSavedSectionRowsFromUser(userID uint8) []SavedSections {
	var savedSectionRows []SavedSections

	middleware.DB.Find(&savedSectionRows, "user_id = ?", userID)

	return savedSectionRows
}

func GetSavedSectionsFromUser(userID uint8) []Section {
	var userSavedSections []Section

	for _, savedSectionRow := range GetSavedSectionRowsFromUser(userID) {
		if savedSectionRow.UserID == userID {
			section, err := GetSectionByID(savedSectionRow.SectionID)
			if err == nil {
				userSavedSections = append(userSavedSections, section)
			}
		}
	}

	return userSavedSections
}
