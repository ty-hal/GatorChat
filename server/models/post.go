package models

import (
	"time"

	"github.com/team/swe-project/middleware"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Post struct {
	PostID       uint8     `json:"post_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	User         string    `json:"username" gorm:"-"`
	ThreadID     uint8     `json:"thread_id,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `json:"creation_date" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoCreateTime"`
	Likes        uint8     `json:"likes"`
	UserLiked    bool      `json:"user_liked" gorm:"-"`
	UserSaved    bool      `json:"user_saved" gorm:"-"`
	SectionName  string    `json:"section_name" gorm:"-"`
	ThreadTitle  string    `json:"thread_title" gorm:"-"`
}

func GetAllPosts() []Post {
	var posts []Post

	middleware.DB.Order("creation_date ASC").Find(&posts)

	return posts
}

func GetThreadAndSectionOfPost(postID uint8, activeUser uint8) (Section, Thread, error) {
	post, er := GetPostByID(postID)
	if er != nil {
		return Section{}, Thread{}, er
	}

	thread, err := post.GetThread()
	if err != nil {
		return Section{}, Thread{}, err
	}

	section, errr := GetSectionByID(thread.SectionID, activeUser)

	if errr != nil {
		return Section{}, Thread{}, errr
	}

	return section, thread, nil
}

func GetPostByID(postID uint8) (Post, error) {
	var post Post

	err := middleware.DB.Find(&post, postID).Error

	if err != nil {
		return Post{}, err
	}

	return post, nil
}

func GetAllPostsWithOffset(pageNumber int, pageSize int, thread_id int) []Post {
	var posts []Post

	middleware.DB.Order("updated_at ASC").Where("thread_id = ?", thread_id).Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&posts)

	return posts
}

func CreatePost(post Post) Post {
	middleware.DB.Create(&post)

	middleware.DB.Table("threads").Where("thread_id = ?", post.ThreadID).Omit("updated_at").Update("message_count", gorm.Expr("message_count + ?", 1))
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
	var post Post
	result := middleware.DB.Clauses(clause.Returning{}).Unscoped().Where("post_id = ?", postID).Delete(&post)

	if result.Error != nil {
		return Post{}, result.Error
	}

	middleware.DB.Table("threads").Where("thread_id = ?", post.ThreadID).Omit("updated_at").Update("message_count", gorm.Expr("message_count + ?", -1))
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
