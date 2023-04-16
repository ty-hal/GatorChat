package models

import (
	"github.com/team/swe-project/middleware"
)

type SavedPosts struct {
	SavedPostID uint8 `json:"saved_post_id" gorm:"primary_key"`
	UserID      uint8 `json:"user_id,omitempty"`
	PostID      uint8 `json:"post_id,omitempty"`
}

func GetAllSavedPostRows() []SavedPosts {
	var savedPosts []SavedPosts

	middleware.DB.Find(&savedPosts)

	return savedPosts
}

func GetSavedPostRowsFromUser(userID uint8) []SavedPosts {
	var savedPostRows []SavedPosts

	middleware.DB.Find(&savedPostRows, "user_id = ?", userID)

	return savedPostRows
}

func GetSavedPostsFromUser(userID uint8) []Post {
	var userSavedPosts []Post

	for _, savedPostRow := range GetSavedPostRowsFromUser(userID) {
		if savedPostRow.UserID == userID {
			post, err := GetPostByID(savedPostRow.PostID)
			if err == nil {
				userSavedPosts = append(userSavedPosts, post)
			}
		}
	}

	return userSavedPosts
}

func ToggleSavedPost(user_id uint8, post_id uint8) SavedPosts {
	var savedPost SavedPosts

	r := middleware.DB.Where("user_id = ? AND post_id = ?", user_id, post_id).Find(&savedPost)

	if r.RowsAffected > 0 {
		middleware.DB.Delete(&savedPost)
	} else {
		savedPost = SavedPosts{UserID: user_id, PostID: post_id}
		middleware.DB.Create(&savedPost)
	}

	return savedPost
}

func CheckPostSaved(user_id uint8, post_id uint8) bool {
	var savedPost SavedPosts

	r := middleware.DB.Where("user_id = ? AND post_id = ?", user_id, post_id).Find(&savedPost)

	return r.RowsAffected > 0
}
