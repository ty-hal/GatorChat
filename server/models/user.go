package models

import (
	"errors"

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
	Dark       bool   `json:"dark,omitempty"`
}

func GetAllUsers() []User {
	var users []User

	middleware.DB.Find(&users)

	return users
}

func GetUser(id uint8) (User, error) {
	var user User

	err := middleware.DB.First(&user, id).Error

	return user, err
}

func CreateUser(user User) {
	middleware.DB.Create(&user)
}

func DeleteUser(id uint8) (User, error) {
	var user User
	var err error

	db := middleware.DB.Delete(&user, id)

	if db.RowsAffected < 1 {
		err = errors.New("User Not Found")
	}

	return user, err
}

func UpdateUser() {
	// figure out criteria for that later, gonna be multiple update functions
}
