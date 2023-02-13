package models

import (
	"time"

	"github.com/team/swe-project/middleware"
)

type Thread struct {
	ThreadID     uint8     `json:"thread_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	SectionID    uint8     `json:"section_id,omitempty"`
	ThreadTitle  string    `json:"thread_title,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `gorm:"column:creation_date;type:timestamp with time zone"`
	UpdatedOn    time.Time `gorm:"column:updated_on;type:timestamp with time zone"`
	Likes        uint8     `json:"likes,omitempty"`
	MessageCount uint8     `json:"messageCount,omitempty"`
}

func GetAllThreads() []Thread {
	var threads []Thread

	middleware.DB.Find(&threads)

	return threads
}

func GetThreadById(threadID uint8) (Thread, error) {
	var thread Thread

	err := middleware.DB.First(&thread, threadID).Error

	// Thread ID not found
	if err != nil {
		return Thread{}, err
	}

	return thread, nil
}

func CreateThread(thread Thread) Thread {
	middleware.DB.Create(&thread)

	return thread
}

func GetCreator(threadID uint8) (User, error) {
	var user User

	result := middleware.DB.First(&user, threadID)
	if result.Error != nil {
		return user, result.Error
	}

	return user, nil
}

func GetSection(threadID uint8) (Section, error) {
	var section Section

	result := middleware.DB.First(&section, threadID)
	if result.Error != nil {
		return section, result.Error
	}

	return section, nil
}

func GetThreadPosts(threadID uint8) []Post {
	var posts []Post

	for _, post := range GetAllPosts() {
		if post.ThreadID == threadID {
			posts = append(posts, post)
		}
	}

	return posts
}
