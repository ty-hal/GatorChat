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

func GetAllClassesFromUser(userID uint8) []UserClasses {
	var userClassRows []UserClasses

	middleware.DB.Find(&userClassRows, "user_id = ?", userID)

	return userClassRows
}
