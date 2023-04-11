package models

import (
	"github.com/team/swe-project/middleware"
	//"gorm.io/gorm/clause"
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
			section, err := GetSectionByID(savedSectionRow.SectionID, userID)
			if err == nil {
				userSavedSections = append(userSavedSections, section)
			}
		}
	}

	return userSavedSections
}

func ToggleSavedSection(user_id uint8, section_id uint8) SavedSections {
	var savedSection SavedSections

	r := middleware.DB.Where("user_id = ? AND section_id = ?", user_id, section_id).Find(&savedSection)

	if r.RowsAffected > 0 {
		middleware.DB.Delete(&savedSection)
	} else {
		savedSection = SavedSections{UserID: user_id, SectionID: section_id}
		middleware.DB.Create(&savedSection)
	}

	return savedSection
}

func CheckSectionSaved(user_id uint8, section_id uint8) bool {
	var savedSection SavedSections

	r := middleware.DB.Where("user_id = ? AND section_id = ?", user_id, section_id).Find(&savedSection)

	return r.RowsAffected > 0
}

/*
func SaveSection(user_id uint8, section_id uint8) SavedSections {
	savedSection := SavedSections{UserID: user_id, SectionID: section_id}

	middleware.DB.Create(&savedSection)

	return savedSection
}

func UnsaveSection(user_id uint8, section_id uint8) SavedSections {
	var savedSection SavedSections

	middleware.DB.Clauses(clause.Returning{}).Unscoped().Where("user_id = ? AND section_id = ?", user_id, section_id).Delete(&savedSection)

	return savedSection
}
*/
