package models

import (
	"fmt"
	"time"

	"github.com/team/swe-project/middleware"
	"gorm.io/gorm"
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
	UserSaved    bool      `json:"user_saved" gorm:"-"`
}

func GetAllThreads() []Thread {
	var threads []Thread

	middleware.DB.Find(&threads)

	return threads
}

func GetAllThreadsWithOffset(pageNumber int, pageSize int, section_id int) []Thread {
	var threads []Thread

	middleware.DB.Order("updated_at DESC").Where("section_id = ?", section_id).Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&threads)

	return threads
}

func GetThreadById(threadID uint8, activeUser uint8) (Thread, error) {
	var thread Thread

	err := middleware.DB.First(&thread, threadID).Error

	// Thread ID not found
	if err != nil {
		return Thread{}, err
	}

	creator, err := GetUserByID(thread.UserID)

	if err != nil {
		thread.User = "[DELETED]"
	} else {
		thread.User = creator.FirstName + " " + creator.LastName
	}

	thread.UserLiked = CheckThreadLike(activeUser, thread.ThreadID)
	thread.UserSaved = CheckThreadSaved(activeUser, thread.ThreadID)

	return thread, nil
}

func CreateThread(thread Thread) Thread {
	middleware.DB.Create(&thread)

	middleware.DB.Table("sections").Where("section_id = ?", thread.SectionID).Omit("updated_at").Update("thread_count", gorm.Expr("thread_count + ?", 1))

	var section_id int64
	middleware.DB.Table("threads").Select("section_id").Where("thread_id = ?", thread.ThreadID).Scan(&section_id)

	var group_id int64
	middleware.DB.Table("sections").Select("group_id").Where("section_id = ?", section_id).Scan(&group_id)

	var parent_id uint64
	middleware.DB.Table("embedded_sections").Select("section_parent_id").Where("group_child_id = ?", group_id).Scan(&parent_id)

	fmt.Print(section_id, " ", group_id, " ", parent_id, " ")

	middleware.DB.Table("sections").Where("section_id = ?", parent_id).Omit("updated_at").Update("thread_count", gorm.Expr("thread_count + ?", 1))

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

	for _, post := range GetThreadPosts(threadID, 0) {
		deletedPost := middleware.DB.Unscoped().Where("post_id = ?", post.PostID).Delete(&Post{})

		if deletedPost.Error != nil {
			return Thread{}, deletedPost.Error
		}
	}

	var section_id int64
	middleware.DB.Table("threads").Select("section_id").Where("thread_id = ?", threadID).Scan(&section_id)

	var thread Thread
	result := middleware.DB.Clauses(clause.Returning{}).Unscoped().Where("thread_id = ?", threadID).Delete(&thread)

	if result.Error != nil {
		return thread, result.Error
	}

	middleware.DB.Table("sections").Where("section_id = ?", thread.SectionID).Omit("updated_at").Update("thread_count", gorm.Expr("thread_count + ?", -1))

	var group_id int64
	middleware.DB.Table("sections").Select("group_id").Where("section_id = ?", section_id).Scan(&group_id)

	var parent_id uint64
	middleware.DB.Table("embedded_sections").Select("section_parent_id").Where("group_child_id = ?", group_id).Scan(&parent_id)

	middleware.DB.Table("sections").Where("section_id = ?", parent_id).Omit("updated_at").Update("thread_count", gorm.Expr("thread_count + ?", -1))

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

func GetThreadPosts(threadID uint8, activeUser uint8) []Post {
	var posts []Post

	for _, post := range GetAllPosts() {
		if post.ThreadID == threadID {
			creator, err := GetUserByID(post.UserID)

			if err != nil {
				post.User = "[DELETED]"
			} else {
				post.User = creator.FirstName + " " + creator.LastName
			}

			post.UserLiked = CheckMessageLike(activeUser, post.PostID)

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
