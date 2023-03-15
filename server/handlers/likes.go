package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/models"
)

func GetLikesByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	likes := models.GetLikesByUser(uint8(id))

	json.NewEncoder(w).Encode(likes)
}

func Like(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	threadID, _ := strconv.Atoi(queryParams.Get("threadID"))
	postID, _ := strconv.Atoi(queryParams.Get("postID"))

	like := models.Like(uint8(activeUser), uint8(threadID), uint8(postID))
	json.NewEncoder(w).Encode(like)
}

func UnLike(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	threadID, _ := strconv.Atoi(queryParams.Get("threadID"))
	postID, _ := strconv.Atoi(queryParams.Get("postID"))

	like := models.UnLike(uint8(activeUser), uint8(threadID), uint8(postID))
	json.NewEncoder(w).Encode(like)
}
