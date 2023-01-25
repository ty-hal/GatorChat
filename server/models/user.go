package models

import (
	"github.com/team/swe-project/middleware"
)

type User struct {
	//gorm.Model
	UserID    uint8  `json:"user_id" gorm:"primary_key"`
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty"`
	Password  string `json:"password,omitempty"`
	//Major          string `json:"major,omitempty"`
	ProfilePic string `json:"profile_pic,omitempty"`
	Email      string `json:"email,omitempty"`
}

func GetAllUsers() []User {
	var users []User

	middleware.DB.Find(&users)

	return users
}

func GetUser(id uint8) User {
	var user User

	middleware.DB.First(&user, id)

	return user
}

func CreateUser(firstName string, lastName string, password string, profilePic string, email string) {
	user := User{
		FirstName:  firstName,
		LastName:   lastName,
		Password:   password,
		ProfilePic: profilePic,
		Email:      email,
	}

	middleware.DB.Create(&user)
}

func DeleteUser(id uint8) {
	middleware.DB.Delete(&User{}, id)
}

func UpdateUser() {
}
