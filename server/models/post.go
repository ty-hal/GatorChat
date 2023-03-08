package models

import (
	"time"

	"github.com/team/swe-project/middleware"
	"gorm.io/gorm/clause"
)

type Post struct {
	PostID       uint8     `json:"post_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	User         string    `json:"username" gorm:"-"`
	ThreadID     uint8     `json:"thread_id,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `json:"creation_date" gorm:"autoCreateTime"`
	UpdatedOn    time.Time `json:"updated_on" gorm:"autoCreateTime"`
	Likes        uint8     `json:"likes,omitempty"`
}

func GetAllPosts() []Post {
	var posts []Post

	middleware.DB.Order("creation_date ASC").Find(&posts)

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

type UpdatedPost struct {
	Content string
}

func UpdatePost(post_id uint8, updatedPost UpdatedPost) (Post, error) {
	var post Post
	err := middleware.DB.Model(&post).Clauses(clause.Returning{}).Where("post_id = ?", post_id).Updates(Post{Content: updatedPost.Content})

	if err.Error != nil {
		return post, err.Error
	}

	return post, nil
}

func DeletePost(postID uint8) (Post, error) {
	result := middleware.DB.Unscoped().Where("post_id = ?", postID).Delete(&Post{})

	if result.Error != nil {
		return Post{}, result.Error
	}

	return Post{}, nil
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
