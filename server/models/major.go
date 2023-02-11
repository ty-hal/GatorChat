package models

import (
	"github.com/team/swe-project/middleware"
)

type Major struct {
	MajorID   uint8  `json:"major_id" gorm:"primary_key"`
	MajorName string `json:"major_name,omitempty"`
}

func GetAllMajors() []Major {
	var majors []Major

	middleware.DB.Find(&majors)

	return majors
}

func GetMajorByID(major_id uint8) Major {
	var major Major

	middleware.DB.First(&major, major_id)

	return major
}
