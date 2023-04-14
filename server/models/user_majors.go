package models

import (
	"github.com/team/swe-project/middleware"
)

type UserMajors struct {
	UserMajorID uint8 `json:"user_major_id" gorm:"primary_key"`
	MajorID     uint8 `json:"major_id,omitempty"`
	UserID      uint8 `json:"user_id,omitempty"`
}

func GetAllUserMajorRows() []UserMajors {
	var userMajors []UserMajors

	middleware.DB.Find(&userMajors)

	return userMajors
}

func GetUserMajorRowsFromUser(userID uint8) []UserMajors {
	var userMajorRows []UserMajors

	middleware.DB.Find(&userMajorRows, "user_id = ?", userID)

	return userMajorRows
}

func GetAllMajorsFromUser(userID uint8) []Major {
	var userMajors []Major

	for _, userMajorRow := range GetUserMajorRowsFromUser(userID) {
		if userMajorRow.UserID == userID {
			major, err := GetMajorByID(userMajorRow.MajorID)
			if err == nil {
				userMajors = append(userMajors, major)
			}
		}
	}

	return userMajors
}

func UpdateMajorsForUser(userID uint8, newMajors []string) []Major {
	var newMajorObjects []Major

	middleware.DB.Where("user_id = ?", userID).Delete(&UserMajors{})

	for _, major := range newMajors {
		newMajor := GetMajorByName(major)

		newMajorObjects = append(newMajorObjects, newMajor)
		middleware.DB.Create(&UserMajors{UserID: userID, MajorID: newMajor.MajorID})
	}

	return newMajorObjects
}
