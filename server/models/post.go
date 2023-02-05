package models

import (
	"errors"

	"github.com/team/swe-project/middleware"
	"gorm.io/datatypes"
)

type Post struct {
	//gorm.Model
	ThreadID     uint8          `json:"post_id" gorm:"primary_key"`
	UserID       uint8          `json:"user_id,omitempty"`
	SectionID    uint8          `json:"thread_id,omitempty"`
	Content      string         `json:"content,omitempty"`
	CreationDate datatypes.Date `json:"creation_date,omitempty"`
	Likes        uint8          `json:"likes,omitempty"`
}

func GetPostByID(postID uint8) (Post, error) {
	var post Post

	err := middleware.DB.Find(&post, postID).Error

	if err != nil {
		return Post{}, errors.New("could not find post")
	}

	return post, nil
}

func GetAllPosts() []Post {
	var posts []Post

	middleware.DB.Find(&posts)

	return posts
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
