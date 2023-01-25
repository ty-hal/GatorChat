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

func GetAllThreadsFromUser(userID uint8) []Thread {
	var threads []Thread
	return threads
}

func GetAllThreadsFromSection(sectionID uint8) []Thread {
	var threads []Thread
	return threads
}
