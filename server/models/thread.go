package models

import (
	"github.com/team/swe-project/middleware"
	"gorm.io/datatypes"
)

type Thread struct {
	//gorm.Model
	ThreadID     uint8          `json:"thread_id" gorm:"primary_key"`
	UserID       uint8          `json:"user_id,omitempty"`
	SectionID    uint8          `json:"section_id,omitempty"`
	ThreadTitle  string         `json:"thread_title,omitempty"`
	Content      string         `json:"content,omitempty"`
	CreationDate datatypes.Date `json:"creation_date,omitempty"`
}

func GetAllThreads() []Thread {
	var threads []Thread

	middleware.DB.Find(&threads)

	return threads
}

func GetThreadById(threadID uint8) Thread {
	var thread Thread

	middleware.DB.Find(&thread, threadID)

	return thread
}

func (t *Thread) GetCreator() (User, error) {
	var user User

	result := middleware.DB.First(&user, t.UserID)
	if result.Error != nil {
		return user, result.Error
	}

	return user, nil
}

func (t *Thread) GetSection() (Section, error) {
	var section Section

	result := middleware.DB.First(&section, t.SectionID)
	if result.Error != nil {
		return section, result.Error
	}

	return section, nil
}

func (t *Thread) GetPosts() []Post {
	var posts []Post

	for _, post := range GetAllPosts() {
		if post.ThreadID == t.ThreadID {
			posts = append(posts, post)
		}
	}

	return posts
}
