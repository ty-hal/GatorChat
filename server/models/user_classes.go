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

func GetAllUserClassRowsFromUser(user User) []UserClasses {
	var userClassRows []UserClasses

	for _, userClassRow := range GetAllUserClassRows() {
		if userClassRow.UserID == user.UserID {
			userClassRows = append(userClassRows, userClassRow)
		}
	}

	return userClassRows
}
