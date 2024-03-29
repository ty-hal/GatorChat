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
	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	thread, db_err := models.GetThreadById(uint8(id), uint8(activeUser))

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

func UpdateThread(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	var updatedThread models.UpdatedThread
	json.NewDecoder(r.Body).Decode(&updatedThread)

	threadUpdated, threadErr := models.UpdateThread(uint8(id), updatedThread)

	if threadErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(threadErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(threadUpdated)
}

func DeleteThread(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	threadDeleted, threadErr := models.DeleteThread(uint8(id))

	if threadErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(threadErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(threadDeleted)
}

func GetThreadPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()
	id, err := strconv.Atoi(params["id"])
	pageNumber, _ := strconv.Atoi(queryParams.Get("pageNumber"))
	pageSize, _ := strconv.Atoi(queryParams.Get("pageSize"))
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	thread_posts := models.GetThreadPostsWithOffset(uint8(id), pageNumber, pageSize, uint8(activeUser))

	json.NewEncoder(w).Encode(thread_posts)
}
