package models

import (
	"time"

	"github.com/team/swe-project/middleware"
)

type Post struct {
	PostID       uint8     `json:"post_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	User         string    `json:"username" gorm:"-"`
	ThreadID     uint8     `json:"thread_id,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `gorm:"-"`
	UpdatedOn    time.Time `gorm:"-"`
	Likes        uint8     `json:"likes,omitempty"`
}

func GetAllPosts() []Post {
	var posts []Post

	middleware.DB.Find(&posts)

	return posts
}

func GetPostByID(postID uint8) (Post, error) {
	var post Post

	err := middleware.DB.Find(&post, postID).Error

	if err != nil {
		return Post{}, err
	}

	return post, nil
}

func CreatePost(post Post) Post {
	middleware.DB.Create(&post)

	return post
}

type UpdatePostHandler struct {
	Post       Post
	NewContent string
}

func UpdatePost(handlerParams UpdatePostHandler) (Post, error) {
	post := handlerParams.Post
	newContent := handlerParams.NewContent

	result := middleware.DB.Model(&post).Update("content", newContent)

	if result.Error != nil {
		return post, result.Error
	}

	return post, nil
}

func DeletePost(post Post) (Post, error) {
	result := middleware.DB.Unscoped().Where("post_id = ?", post.PostID).Delete(&Post{})

	if result.Error != nil {
		return post, result.Error
	}

	return post, nil
}

func (p *Post) GetThread() (Thread, error) {
	var thread Thread

	result := middleware.DB.First(&thread, p.ThreadID)
	if result.Error != nil {
		return thread, result.Error
	}

	return thread, nil
}

func (p *Post) GetCreator() (User, error) {
	var user User

	result := middleware.DB.First(&user, p.UserID)
	if result.Error != nil {
		return user, result.Error
	}

	return user, nil
}
