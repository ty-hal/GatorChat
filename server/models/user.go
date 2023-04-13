package models

import (
	"errors"
	"time"

	"github.com/team/swe-project/middleware"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm/clause"
)

type User struct {
	UserID       uint8     `json:"user_id" gorm:"primary_key"`
	FirstName    string    `json:"first_name,omitempty"`
	LastName     string    `json:"last_name,omitempty"`
	Email        string    `json:"email,omitempty"`
	Password     string    `json:"password,omitempty"`
	ProfilePic   string    `json:"profile_pic,omitempty"`
	Dark         bool      `json:"dark,omitempty"`
	Likes        uint8     `json:"likes,omitempty"`
	CreationDate time.Time `json:"creation_date" gorm:"autoCreateTime"`
}

type UserDetailed struct {
	User
	Classes []string `json:"classes,omitempty"`
	Majors  []string `json:"majors,omitempty"`
}

func GetAllUsers() []User {
	var users []User

	middleware.DB.Find(&users)

	return users
}

func GetUserByID(id uint8) (User, error) {
	var user User

	err := middleware.DB.First(&user, id).Error

	if err != nil {
		return User{}, err
	}

	return user, nil
}

func GetUserByEmail(email string) (User, error) {
	var user User

	err := middleware.DB.Where("email = ?", email).First(&user).Error

	if err != nil {
		return User{}, err
	}

	return user, nil
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

func DeleteUser(user_id uint8) (User, error) {

	user, err := GetUserByID(user_id)

	if err != nil {
		return user, err
	}

	for _, userClass := range GetUserClassRowsFromUser(user_id) {
		deletedUserClass := middleware.DB.Unscoped().Where("user_class_id = ?", userClass.UserClassID).Delete(&UserClasses{})

		if deletedUserClass.Error != nil {
			return user, deletedUserClass.Error
		}
	}

	for _, userMajor := range GetUserMajorRowsFromUser(user_id) {
		deletedUserMajor := middleware.DB.Unscoped().Where("user_major_id = ?", userMajor.UserMajorID).Delete(&UserMajors{})

		if deletedUserMajor.Error != nil {
			return user, deletedUserMajor.Error
		}
	}

	for _, userRole := range GetUserRoleRowsFromUser(user_id) {
		deletedUserRole := middleware.DB.Unscoped().Where("user_role_id = ?", userRole.UserRoleID).Delete(&UserRoles{})

		if deletedUserRole.Error != nil {
			return user, deletedUserRole.Error
		}
	}

	for _, thread := range user.GetThreads() {
		err := middleware.DB.Model(&thread).Clauses(clause.Returning{}).Where("thread_id = ? AND user_id = ?", thread.ThreadID, user_id).Update("user_id", 0)

		if err.Error != nil {
			return user, err.Error
		}
	}

	for _, post := range user.GetPosts() {
		err := middleware.DB.Model(&post).Clauses(clause.Returning{}).Where("post_id = ? AND user_id = ?", post.PostID, user_id).Update("user_id", 0)

		if err.Error != nil {
			return user, err.Error
		}
	}

	result := middleware.DB.Where("user_id = ?", user.UserID).Delete(&User{})

	if result.Error != nil {
		return user, result.Error
	}

	return user, nil
}

type UpdatedUserPassword struct {
	Password string
}

func UpdatePassword(user_id uint8, updatedUser UpdatedUserPassword) (User, error) {
	var user User

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updatedUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return User{}, errors.New("could not hash password")
	}

	dbErr := middleware.DB.Model(&user).Clauses(clause.Returning{}).Where("user_id = ?", user_id).Updates(User{Password: string(hashedPassword)})

	if dbErr.Error != nil {
		return user, dbErr.Error
	}

	return user, nil
}

type UpdatedUserProfilePic struct {
	ProfilePic string
}

func UpdateProfilePic(user_id uint8, updatedUser UpdatedUserProfilePic) (User, error) {
	var user User

	dbErr := middleware.DB.Model(&user).Clauses(clause.Returning{}).Where("user_id = ?", user_id).Updates(User{ProfilePic: updatedUser.ProfilePic})

	if dbErr.Error != nil {
		return user, dbErr.Error
	}

	return user, nil
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

func (u *User) GetThreads() []Thread {
	var threads []Thread

	for _, thread := range GetAllThreads() {
		if thread.UserID == u.UserID {
			threads = append(threads, thread)
		}
	}

	return threads
}

func (u *User) GetPosts() []Post {
	var posts []Post

	for _, post := range GetAllPosts() {
		if post.UserID == u.UserID {
			posts = append(posts, post)
		}
	}

	return posts
}
