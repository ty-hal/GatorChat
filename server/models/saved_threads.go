package models

import (
	"github.com/team/swe-project/middleware"
)

type SavedThreads struct {
	SavedThreadID uint8 `json:"saved_thread_id" gorm:"primary_key"`
	UserID        uint8 `json:"user_id,omitempty"`
	ThreadID      uint8 `json:"thread_id,omitempty"`
}

func GetAllSavedThreadRows() []SavedThreads {
	var savedThreads []SavedThreads

	middleware.DB.Find(&savedThreads)

	return savedThreads
}

func GetSavedThreadRowsFromUser(userID uint8) []SavedThreads {
	var savedThreadRows []SavedThreads

	middleware.DB.Find(&savedThreadRows, "user_id = ?", userID)

	return savedThreadRows
}

func GetSavedThreadsFromUser(userID uint8) []Thread {
	var userSavedThreads []Thread

	for _, savedThreadRow := range GetSavedThreadRowsFromUser(userID) {
		if savedThreadRow.UserID == userID {
			thread, err := GetThreadById(savedThreadRow.ThreadID, userID)
			if err == nil {
				userSavedThreads = append(userSavedThreads, thread)
			}
		}
	}

	return userSavedThreads
}
