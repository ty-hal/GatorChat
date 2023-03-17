package models

import (
	"time"

	"github.com/team/swe-project/middleware"
	"gorm.io/gorm/clause"
)

type Thread struct {
	ThreadID     uint8     `json:"thread_id" gorm:"primary_key"`
	UserID       uint8     `json:"user_id,omitempty"`
	User         string    `json:"username" gorm:"-"`
	SectionID    uint8     `json:"section_id,omitempty"`
	ThreadTitle  string    `json:"thread_title,omitempty"`
	Content      string    `json:"content,omitempty"`
	CreationDate time.Time `json:"creation_date" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoCreateTime"`
	Likes        uint8     `json:"likes"`
	MessageCount uint8     `json:"message_count"`
	UserLiked    bool      `json:"user_liked" gorm:"-"`
}

func GetAllThreads() []Thread {
	var threads []Thread

	middleware.DB.Find(&threads)

	return threads
}

func GetAllThreadsWithOffset(pageNumber int, pageSize int) []Thread {
	var threads []Thread

	middleware.DB.Order("updated_at DESC").Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&threads)

	return threads
}

func GetThreadById(threadID uint8) (Thread, error) {
	var thread Thread

	err := middleware.DB.First(&thread, threadID).Error

	// Thread ID not found
	if err != nil {
		return Thread{}, err
	}

	creator, err := GetUserByID(thread.UserID)

	if err != nil {
		thread.User = "Anonymous"
	} else {
		thread.User = creator.FirstName + " " + creator.LastName
	}

	thread.UserLiked = CheckThreadLike(thread.UserID, thread.ThreadID)

	return thread, nil
}

func CreateThread(thread Thread) Thread {
	middleware.DB.Create(&thread)

	return thread
}

type UpdatedThread struct {
	ThreadTitle string `json:"thread_title,omitempty"`
	Content     string `json:"content,omitempty"`
}

func UpdateThread(thread_id uint8, updatedThread UpdatedThread) (Thread, error) {
	var thread Thread
	err := middleware.DB.Model(&thread).Clauses(clause.Returning{}).Where("thread_id = ?", thread_id).Updates(Thread{ThreadTitle: updatedThread.ThreadTitle, Content: updatedThread.Content})

	if err.Error != nil {
		return thread, err.Error
	}

	return thread, nil
}

func DeleteThread(threadID uint8) (Thread, error) {

	for _, post := range GetThreadPosts(threadID) {
		deletedPost := middleware.DB.Unscoped().Where("post_id = ?", post.PostID).Delete(&Post{})

		if deletedPost.Error != nil {
			return Thread{}, deletedPost.Error
		}
	}

	var thread Thread
	result := middleware.DB.Clauses(clause.Returning{}).Unscoped().Where("thread_id = ?", threadID).Delete(&thread)

	if result.Error != nil {
		return thread, result.Error
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
			creator, err := GetUserByID(post.UserID)

			if err != nil {
				post.User = "Anonymous"
			} else {
				post.User = creator.FirstName + " " + creator.LastName
			}

			post.UserLiked = CheckMessageLike(post.UserID, post.PostID)

			posts = append(posts, post)
		}
	}

	return posts
}

func GetThreadLikes(threadID uint8) int64 {
	var count int64

	middleware.DB.Table("likes").Where("thread_id = ?", threadID).Count(&count)
	return count
}
