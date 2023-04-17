package models

import (
	"errors"
	"fmt"
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

	for _, thread := range GetUserThreads(user_id) {
		err := middleware.DB.Model(&thread).Clauses(clause.Returning{}).Where("thread_id = ? AND user_id = ?", thread.ThreadID, user_id).Update("user_id", 0)

		if err.Error != nil {
			return user, err.Error
		}
	}

	for _, post := range GetUserPosts(user_id) {
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

func GetUserThreads(userID uint8) []Thread {
	var threads []Thread

	middleware.DB.Find(&threads, "user_id = ?", userID)

	for i := range threads {
		creator, err := GetUserByID(threads[i].UserID)

		if err == nil {
			threads[i].User = creator.FirstName + " " + creator.LastName
			threads[i].UserLiked = CheckMessageLike(userID, threads[i].ThreadID)
			threads[i].UserSaved = CheckPostSaved(userID, threads[i].ThreadID)
		}
	}

	return threads
}

func GetUserThreadsWithOffset(userID uint8, pageNumber int, pageSize int) []Thread {
	var threads []Thread

	middleware.DB.Order("updated_at DESC").Where("user_id = ?", userID).Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&threads)

	for i := range threads {
		creator, err := GetUserByID(threads[i].UserID)

		if err == nil {
			threads[i].User = creator.FirstName + " " + creator.LastName
			threads[i].UserLiked = CheckMessageLike(userID, threads[i].ThreadID)
			threads[i].UserSaved = CheckPostSaved(userID, threads[i].ThreadID)
		}
	}

	return threads
}
func GetUserPostsWithOffset(userID uint8, pageNumber int, pageSize int) []Post {
	var posts []Post

	middleware.DB.Order("updated_at DESC").Where("user_id = ?", userID).Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&posts)

	for i := range posts {
		creator, err := GetUserByID(posts[i].UserID)

		if err == nil {
			section, thread, er := GetThreadAndSectionOfPost(posts[i].PostID, userID)

			if er != nil {
				fmt.Println("Error in saved posts from user")
				return nil
			}

			posts[i].User = creator.FirstName + " " + creator.LastName
			posts[i].UserLiked = CheckMessageLike(userID, posts[i].PostID)
			posts[i].UserSaved = CheckPostSaved(userID, posts[i].PostID)
			posts[i].SectionName = section.SectionName
			posts[i].ThreadTitle = thread.ThreadTitle
		}
	}

	return posts
}

func GetUserPosts(userID uint8) []Post {
	var posts []Post

	middleware.DB.Find(&posts, "user_id = ?", userID)

	for i := range posts {
		creator, err := GetUserByID(posts[i].UserID)

		if err == nil {
			section, thread, er := GetThreadAndSectionOfPost(posts[i].PostID, userID)

			if er != nil {
				fmt.Println("Error in saved posts from user")
				return nil
			}

			posts[i].User = creator.FirstName + " " + creator.LastName
			posts[i].UserLiked = CheckMessageLike(userID, posts[i].PostID)
			posts[i].UserSaved = CheckPostSaved(userID, posts[i].PostID)
			posts[i].SectionName = section.SectionName
			posts[i].ThreadTitle = thread.ThreadTitle
		}
	}

	return posts
}

type Stats struct {
	Threads_Posted  int64 `json:"threads_posted"`
	Messages_Posted int64 `json:"messages_posted"`
	Likes_Received  int64 `json:"likes_received"`
	Likes_Given     int64 `json:"likes_given"`
}

func GetUserStats(userID uint8) Stats {
	var stats Stats

	// Get Thread and Post count numbers
	middleware.DB.Table("threads").Where("user_id = ?", userID).Count(&stats.Threads_Posted)
	middleware.DB.Table("posts").Where("user_id = ?", userID).Count(&stats.Messages_Posted)

	// Get Likes Given and Likes Received
	middleware.DB.Table("likes").Where("user_id = ?", userID).Count(&stats.Likes_Given)
	middleware.DB.Table("users").Select("likes").Where("user_id = ?", userID).Count(&stats.Likes_Received)

	return stats
}
