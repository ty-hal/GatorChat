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

	"log"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// Added stuff below
const SecretKey = "secret"

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

// TY EDITED SIGN IN
func SignIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type login struct {
		Email    string `json:"email,omitempty"`
		Password string `json:"password,omitempty"`
	}

	var loginInfo login
	json.NewDecoder(r.Body).Decode(&loginInfo)

	user, err := models.CheckSignIn(loginInfo.Email, loginInfo.Password)
	// fmt.Print(strconv.Itoa(int(user.UserID)))

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
		log.Fatal(err)
	}

	cookie := http.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HttpOnly: true,
		Secure:   true,
	}
	http.SetCookie(w, &cookie)

	json.NewEncoder(w).Encode(user)
	json.NewEncoder(w).Encode(cookie)
}

// TY MADE THIS
func ValidateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	fmt.Print("Go time")
	cookie, err := r.Cookie("jwt")
	if err != nil {
		log.Fatal("BADDD")
	}
	// validate token, it will return Token and error
	token, err := jwt.ParseWithClaims(cookie.Value, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		log.Fatal("NOO")
		// // check if Error is Signature Invalid Error
		// if err == jwt.ErrSignatureInvalid {
		// 	// return the Unauthorized Status
		// 	w.WriteHeader(http.StatusUnauthorized)
		// 	return
		// }
		// // Return the Bad Request for any other error
		// w.WriteHeader(http.StatusBadRequest)
		return
	}
	// Validate the token if it expired or not
	// if !token.Valid {
	// 	// return the Unauthoried Status for expired token
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	return
	// }

	//KEEP THIS:
	// claims := token.Claims.(*jwt.StandardClaims)
	// var user User
	// middleware.DB.Where("id = ?", claims.Issuer).First(&user)

	// Send the username Dashboard message
	json.NewEncoder(w).Encode(token)

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
