package models

import (
	"errors"

	"github.com/team/swe-project/middleware"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	//gorm.Model
	UserID    uint8  `json:"user_id" gorm:"primary_key"`
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty"`
	Email     string `json:"email,omitempty"`
	Password  string `json:"password,omitempty"`
	//Major          string `json:"major,omitempty"`
	ProfilePic string `json:"profile_pic,omitempty"`
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

func CreateUser(user User) (User, error) {
	// Hash Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return User{}, errors.New("could not hash password")
	}

	user.Password = string(hashedPassword)
	result := middleware.DB.Where("email = ?", user.Email).FirstOrCreate(&user)

	// User already exists
	if result.RowsAffected == 0 {
		return User{}, errors.New("User Already Exists")
	}

	return user, nil
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

func CheckSignIn(email string, password string) (User, error) {
	var user User

	err := middleware.DB.First(&user, "email = ?", email).Error

	// Database Error
	if err != nil {
		return User{}, err
	}

	// Check Password
	passwordErr := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	// Invalid login
	if passwordErr != nil {
		return User{}, passwordErr
	}

	return user, nil
}
