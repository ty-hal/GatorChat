package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/middleware"
	"github.com/team/swe-project/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"time"

	"github.com/dgrijalva/jwt-go"
)

// Added stuff below

//	if err != nil {
//		log.Fatal("Error loading .env file")
//	}
var SecretKey = os.Getenv("secretkey")

//above

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
	fmt.Printf("%s", SecretKey)
	fmt.Println(SecretKey)
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

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.UserID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
	}

	cookie := http.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HttpOnly: true,
		Path:     "/",
	}
	http.SetCookie(w, &cookie)

	json.NewEncoder(w).Encode(user)
}

func ValidateUser(w http.ResponseWriter, r *http.Request) {
	// Get cookie
	cookie, err := r.Cookie("jwt")
	if err != nil {
		// Error with getting the cookie
		w.WriteHeader(http.StatusNotFound)
		return
	}
	// Validate token with the secret key
	token, err := jwt.ParseWithClaims(cookie.Value, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		// User is unauthorized
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// json.NewEncoder(w).Encode(token)
	//Get user info from the token
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.User
	err = middleware.DB.First(&user, "user_id = ?", claims.Issuer).Error
	// Database Error
	if err != nil {
		// Error with database
		w.WriteHeader(http.StatusConflict)
		return
	}
	json.NewEncoder(w).Encode(user)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour), // Set expired time to the past
		HttpOnly: true,
		Path:     "/",
	}
	http.SetCookie(w, &cookie)

	json.NewEncoder(w).Encode("Successfully logged out")
}

// DELETING WITH FOREGIN KEYS NOT FINISHED YET

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var user models.User
	json.NewDecoder(r.Body).Decode(&user)
	//params := mux.Vars(r)
	//user, err := strconv.Atoi(params["id"])

	// Invalid parameter
	/*
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid Parameter: id"))
			return
		}*/

	userDeleted, userErr := models.DeleteUser(user)

	if userErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(userErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(userDeleted)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UPDATE USER")
}
