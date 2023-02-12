package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users := models.GetAllUsers()

	json.NewEncoder(w).Encode(users)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	user, db_err := models.GetUserByID(uint8(id))

	// User not found
	if errors.Is(db_err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User Not Found"))
		return
	}

	json.NewEncoder(w).Encode(user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var user models.User
	json.NewDecoder(r.Body).Decode(&user)

	// Ensure all fields are there
	if user.FirstName == "" || user.LastName == "" || user.Password == "" || user.Email == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Request Body Missing Fields"))
		return
	}

	// Create User
	userCreated, userErr := models.CreateUser(user)

	if userErr != nil {
		// If password could not be hashed
		if userErr.Error() == "could not hash password" {
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte(userErr.Error()))
			return
		}

		// If user already exists
		if userErr.Error() == "User Already Exists" {
			w.WriteHeader(http.StatusConflict)
			w.Write([]byte(userErr.Error()))
			return
		}
	}

	json.NewEncoder(w).Encode(userCreated)
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type login struct {
		Email    string `json:"email,omitempty"`
		Password string `json:"password,omitempty"`
	}

	var loginInfo login
	json.NewDecoder(r.Body).Decode(&loginInfo)

	user, err := models.CheckSignIn(loginInfo.Email, loginInfo.Password)

	// User not Found
	if errors.Is(err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
	}

	// Invalid Password
	if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		w.WriteHeader(http.StatusUnauthorized)
	}

	json.NewEncoder(w).Encode(user)
}

// DELETING WITH FOREGIN KEYS NOT FINISHED YET
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	user, dbErr := models.DeleteUser(uint8(id))

	if dbErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(dbErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UPDATE USER")
}
