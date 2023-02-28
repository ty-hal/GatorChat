package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/models"
	"gorm.io/gorm"
)

func GetAllThreads(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	threads := models.GetAllThreads()

	json.NewEncoder(w).Encode(threads)
}

func GetThreadById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	thread, db_err := models.GetThreadById(uint8(id))

	// Thread not found
	if errors.Is(db_err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Thread Not Found"))
		return
	}

	json.NewEncoder(w).Encode(thread)
}

func CreateThread(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var thread models.Thread
	json.NewDecoder(r.Body).Decode(&thread)

	// Ensure all fields are there
	if thread.ThreadTitle == "" || thread.Content == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Request Body Missing Fields"))
		return
	}

	// Create Thread
	threadCreated := models.CreateThread(thread)

	json.NewEncoder(w).Encode(threadCreated)
}

func DeleteThread(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var thread models.Thread
	json.NewDecoder(r.Body).Decode(&thread)
	//params := mux.Vars(r)
	//user, err := strconv.Atoi(params["id"])

	// Invalid parameter
	/*
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid Parameter: id"))
			return
		}*/

	threadDeleted, threadErr := models.DeleteThread(thread)

	if threadErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(threadErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(threadDeleted)
}

// Delete / Update Thread

func GetThreadPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	thread_posts := models.GetThreadPosts(uint8(id))

	json.NewEncoder(w).Encode(thread_posts)
}
