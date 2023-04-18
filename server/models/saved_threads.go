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

func GetSavedThreadRowsFromUser(userID uint8, pageNumber int, pageSize int) []SavedThreads {
	var savedThreadRows []SavedThreads

	middleware.DB.Where("user_id = ?", userID).Offset((pageNumber - 1) * pageSize).Limit(pageSize).Find(&savedThreadRows)

	return savedThreadRows
}

func GetSavedThreadsFromUser(userID uint8, pageNumber int, pageSize int) []Thread {
	var userSavedThreads []Thread

	for _, savedThreadRow := range GetSavedThreadRowsFromUser(userID, pageNumber, pageSize) {
		if savedThreadRow.UserID == userID {
			thread, err := GetThreadById(savedThreadRow.ThreadID, userID)
			if err == nil {
				userSavedThreads = append(userSavedThreads, thread)
			}
		}
	}

	return userSavedThreads
}

func ToggleSavedThread(user_id uint8, thread_id uint8) SavedThreads {
	var savedThread SavedThreads

	r := middleware.DB.Where("user_id = ? AND thread_id = ?", user_id, thread_id).Find(&savedThread)

	if r.RowsAffected > 0 {
		middleware.DB.Delete(&savedThread)
	} else {
		savedThread = SavedThreads{UserID: user_id, ThreadID: thread_id}
		middleware.DB.Create(&savedThread)
	}

	return savedThread
}

func CheckThreadSaved(user_id uint8, thread_id uint8) bool {
	var savedThread SavedThreads

	r := middleware.DB.Where("user_id = ? AND thread_id = ?", user_id, thread_id).Find(&savedThread)

	return r.RowsAffected > 0
}
