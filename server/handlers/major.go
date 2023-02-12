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

func GetAllMajors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	majors := models.GetAllMajors()

	json.NewEncoder(w).Encode(majors)
}

func GetMajorByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["major_id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: major_id"))
		return
	}

	major, db_err := models.GetMajorByID(uint8(id))

	// Major not found
	if errors.Is(db_err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Major Not Found"))
		return
	}

	json.NewEncoder(w).Encode(major)
}
