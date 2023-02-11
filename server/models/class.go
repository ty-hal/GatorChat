package models

import (
	"github.com/team/swe-project/middleware"
)

type Class struct {
	ClassID   string `json:"class_id" gorm:"primary_key"`
	ClassName string `json:"class_name,omitempty"`
}

func GetAllClasses() []Class {
	var classes []Class

	middleware.DB.Find(&classes)

	return classes
}

func GetClassByID(class_id string) Class {
	var class Class

	middleware.DB.Where("class_id = ?", class_id).First(&class)

	return class
}
