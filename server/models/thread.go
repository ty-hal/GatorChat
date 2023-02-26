package models

import (
	"time"

	"github.com/team/swe-project/middleware"
)

type Thread struct {
	ThreadID     uint8     `json:"thread_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	User         string    `json:"username" gorm:"-"`
	SectionID    uint8     `json:"section_id,omitempty"`
	ThreadTitle  string    `json:"thread_title,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `json:"creation_date" gorm:"autoCreateTime"`
	UpdatedOn    time.Time `json:"updated_on" gorm:"-"`
	Likes        uint8     `json:"likes,omitempty"`
	MessageCount uint8     `json:"message_count,omitempty" gorm:"-"`
}

func GetAllThreads() []Thread {
	var threads []Thread

	middleware.DB.Find(&threads)

	return threads
}

func GetAllThreadsWithOffset(pageNumber int, pageSize int) []Thread {
	var threads []Thread

	middleware.DB.Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&threads)

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

func DeleteThread(thread Thread) (Thread, error) {

	result := middleware.DB.Unscoped().Where("thread_id = ?", thread.ThreadID).Delete(&Thread{})

	if result.Error != nil {
		return thread, result.Error
	}

	for _, post := range GetThreadPosts(thread.ThreadID) {
		deletedPost := middleware.DB.Unscoped().Where("post_id = ?", post.PostID).Delete(&Post{})

		if deletedPost.Error != nil {
			return thread, deletedPost.Error
		}
	}

	return thread, nil
}

func GetCreator(threadID uint8) (User, error) {
	var user User

	result := middleware.DB.First(&user, threadID).Error
	if result != nil {
		return User{}, result
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
