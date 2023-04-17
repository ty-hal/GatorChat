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

func GetClassByID(class_id string) (Class, error) {
	class := Class{ClassID: class_id}

	middleware.DB.Where("class_id = ?", class_id).FirstOrCreate(&class)

	return class, nil
}
