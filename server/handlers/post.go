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

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	threads := models.GetAllPosts()

	json.NewEncoder(w).Encode(threads)
}

func GetPostById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	post, db_err := models.GetPostByID(uint8(id))

	// Thread not found
	if errors.Is(db_err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Post Not Found"))
		return
	}

	json.NewEncoder(w).Encode(post)
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var post models.Post
	json.NewDecoder(r.Body).Decode(&post)

	// Ensure all fields are there
	if post.Content == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Request Body Missing Fields"))
		return
	}

	// Create Post
	postCreated := models.CreatePost(post)

	json.NewEncoder(w).Encode(postCreated)
}

func UpdatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	var updatedPost models.UpdatedPost
	json.NewDecoder(r.Body).Decode(&updatedPost)

	postUpdated, postErr := models.UpdatePost(uint8(id), updatedPost)

	if postErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(postErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(postUpdated)

}

func DeletePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}
	postDeleted, postErr := models.DeletePost(uint8(id))

	if postErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(postErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(postDeleted)

}
