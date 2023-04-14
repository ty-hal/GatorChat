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

func GetAllSections(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	sections := models.GetAllSections()

	json.NewEncoder(w).Encode(sections)
}

func GetSectionById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()

	id, err := strconv.Atoi(params["id"])
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	section, db_err := models.GetSectionByID(uint8(id), uint8(activeUser))

	// Thread not found
	if errors.Is(db_err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Section Not Found"))
		return
	}

	json.NewEncoder(w).Encode(section)
}

func GetSectionThreads(w http.ResponseWriter, r *http.Request) {
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

	section_threads := models.GetSectionThreads(uint8(id), pageNumber, pageSize, uint8(activeUser))

	json.NewEncoder(w).Encode(section_threads)
}

func GetChildGroup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()

	id, err := strconv.Atoi(params["id"])
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	child_sections := models.GetChildGroup(uint8(id), uint8(activeUser))

	json.NewEncoder(w).Encode(child_sections)
}

func GetParentGroup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()

	id, err := strconv.Atoi(params["id"])
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	parent_sections := models.GetParentGroup(uint(id), uint8(activeUser))

	json.NewEncoder(w).Encode(parent_sections)
}
