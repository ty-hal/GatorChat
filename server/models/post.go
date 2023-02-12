package models

import (
	"time"

	"github.com/team/swe-project/middleware"
)

type Post struct {
	PostID       uint8     `json:"post_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	ThreadID     uint8     `json:"thread_id,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `gorm:"column:creation_date;type:timestamp with time zone"`
	UpdatedOn    time.Time `gorm:"column:updated_on;type:timestamp with time zone"`
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
