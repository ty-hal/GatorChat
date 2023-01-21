package models

import (
	"github.com/team/swe-project/middleware"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email          string `json:"email,omitempty"`
	Password       string `json:"password,omitempty"`
	Major          string `json:"major,omitempty"`
	ProfilePicture string `json:"profile_picture,omitempty"`
}

func GetAllUsers() {
}

func GetUser() {
}

func CreateUser() {
	// Insert Mock User
	user := User{
		Email:          "test3@ufl.edu",
		Password:       "test3password",
		Major:          "CS3",
		ProfilePicture: "teststring3",
	}

	middleware.DB.Create(&user)
}

func DeleteUser() {
}

func UpdateUser() {
}
