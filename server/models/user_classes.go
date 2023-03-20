package models

import (
	"github.com/team/swe-project/middleware"
)

type UserClasses struct {
	UserClassID uint8  `json:"user_class_id" gorm:"primary_key"`
	ClassID     string `json:"class_id,omitempty"`
	UserID      uint8  `json:"user_id,omitempty"`
}

func GetAllUserClassRows() []UserClasses {
	var userClasses []UserClasses

	middleware.DB.Find(&userClasses)

	return userClasses
}

func GetAllClassesFromUser(userID uint8) []Class {
	var userClassRows []UserClasses
	var userClasses []Class

	middleware.DB.Find(&userClassRows, "user_id = ?", userID)

	for _, userClassRow := range userClassRows {
		if userClassRow.UserID == userID {
			class, err := GetClassByID(userClassRow.ClassID)
			if err == nil {
				userClasses = append(userClasses, class)
			}
		}
	}

	return userClasses
}
