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
