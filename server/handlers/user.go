package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/middleware"
	"github.com/team/swe-project/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"time"

	"github.com/dgrijalva/jwt-go"
)

var SecretKey = os.Getenv("secretkey")

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

	// Add user classes
	userClasses := models.GetAllClassesFromUser(uint8(id))
	var classNames []string
	for _, class := range userClasses {
		classNames = append(classNames, class.ClassName)
	}
	// Add user majors
	userMajors := models.GetAllMajorsFromUser(uint8(id))
	var majorNames []string
	for _, major := range userMajors {
		majorNames = append(majorNames, major.MajorName)
	}

	// Add majors and classes to user
	userDetailed := models.UserDetailed{
		User:    user,
		Classes: classNames,
		Majors:  majorNames,
	}

	json.NewEncoder(w).Encode(userDetailed)
}

func GetUserByEmail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	email := queryParams.Get("email")

	user, db_err := models.GetUserByEmail(email)

	// User not found
	if errors.Is(db_err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User Not Found"))
		return
	}

	json.NewEncoder(w).Encode(user)
}

func GetCreatedThreads(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()
	id, err := strconv.Atoi(params["id"])
	pageNumber, _ := strconv.Atoi(queryParams.Get("pageNumber"))
	pageSize, _ := strconv.Atoi(queryParams.Get("pageSize"))

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userThreads := models.GetUserThreadsWithOffset(uint8(id), pageNumber, pageSize)

	json.NewEncoder(w).Encode(userThreads)
}

func GetCreatedPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()
	id, err := strconv.Atoi(params["id"])
	pageNumber, _ := strconv.Atoi(queryParams.Get("pageNumber"))
	pageSize, _ := strconv.Atoi(queryParams.Get("pageSize"))

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userPosts := models.GetUserPostsWithOffset(uint8(id), pageNumber, pageSize)

	json.NewEncoder(w).Encode(userPosts)
}

func GetClasses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userClasses := models.GetAllClassesFromUser(uint8(id))

	json.NewEncoder(w).Encode(userClasses)
}

func GetMajors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userMajors := models.GetAllMajorsFromUser(uint8(id))

	json.NewEncoder(w).Encode(userMajors)
}

func GetRoles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userRoles := models.GetAllRolesFromUser(uint8(id))

	json.NewEncoder(w).Encode(userRoles)
}

func GetUserStats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userStats := models.GetUserStats(uint8(id))

	json.NewEncoder(w).Encode(userStats)
}

func GetSavedSections(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userSections := models.GetSavedSectionsFromUser(uint8(id))

	json.NewEncoder(w).Encode(userSections)
}

func GetSavedThreads(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	queryParams := r.URL.Query()
	id, err := strconv.Atoi(params["id"])
	pageNumber, _ := strconv.Atoi(queryParams.Get("pageNumber"))
	pageSize, _ := strconv.Atoi(queryParams.Get("pageSize"))

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userThreads := models.GetSavedThreadsFromUser(uint8(id), pageNumber, pageSize)

	json.NewEncoder(w).Encode(userThreads)
}

func GetSavedPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userPosts := models.GetSavedPostsFromUser(uint8(id))

	json.NewEncoder(w).Encode(userPosts)
}

func ToggleSectionSaved(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	sectionID, _ := strconv.Atoi(queryParams.Get("sectionID"))

	savedSection := models.ToggleSavedSection(uint8(activeUser), uint8(sectionID))
	json.NewEncoder(w).Encode(savedSection)
}

func ToggleThreadSaved(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	threadID, _ := strconv.Atoi(queryParams.Get("threadID"))

	savedThread := models.ToggleSavedThread(uint8(activeUser), uint8(threadID))
	json.NewEncoder(w).Encode(savedThread)
}

func TogglePostSaved(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	postID, _ := strconv.Atoi(queryParams.Get("postID"))

	savedPost := models.ToggleSavedPost(uint8(activeUser), uint8(postID))
	json.NewEncoder(w).Encode(savedPost)
}

func UpdateMajors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	queryParams := r.URL.Query()
	majorNames := queryParams.Get("majorNames")

	newMajors := models.UpdateMajorsForUser(uint8(id), strings.Split(majorNames, ","))
	json.NewEncoder(w).Encode(newMajors)
}

func UpdateClasses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	queryParams := r.URL.Query()
	classCodes := queryParams.Get("classCodes")

	newClasses := models.UpdateClassesForUser(uint8(id), strings.Split(classCodes, ","))
	json.NewEncoder(w).Encode(newClasses)
}

func ToggleClass(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	userID, _ := strconv.Atoi(queryParams.Get("userID"))
	classID := queryParams.Get("classID")

	userClass := models.ToggleClass(uint8(userID), classID)
	json.NewEncoder(w).Encode(userClass)
}

func UserInClass(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	userID, _ := strconv.Atoi(queryParams.Get("userID"))
	classID := queryParams.Get("classID")

	inClass := models.CheckUserInClass(uint8(userID), classID)
	json.NewEncoder(w).Encode(inClass)
}

/*
func SaveSection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	sectionID, _ := strconv.Atoi(queryParams.Get("sectionID"))

	savedSection := models.SaveSection(uint8(activeUser), uint8(sectionID))
	json.NewEncoder(w).Encode(savedSection)
}

func UnsaveSection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	activeUser, _ := strconv.Atoi(queryParams.Get("activeUser"))
	sectionID, _ := strconv.Atoi(queryParams.Get("sectionID"))

	unsavedSection := models.UnsaveSection(uint8(activeUser), uint8(sectionID))
	json.NewEncoder(w).Encode(unsavedSection)
}
*/

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

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.UserID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // 1 day
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

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	userDeleted, userErr := models.DeleteUser(uint8(id))

	if userErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(userErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(userDeleted)
}

func UpdatePassword(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	var updatedUser models.UpdatedUserPassword
	json.NewDecoder(r.Body).Decode(&updatedUser)

	userUpdated, userErr := models.UpdatePassword(uint8(id), updatedUser)

	if userErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(userErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(userUpdated)
}

func UpdateProfilePic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	// Invalid parameter
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid Parameter: id"))
		return
	}

	var updatedUser models.UpdatedUserProfilePic
	json.NewDecoder(r.Body).Decode(&updatedUser)

	userUpdated, userErr := models.UpdateProfilePic(uint8(id), updatedUser)

	if userErr != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(userErr.Error()))
		return
	}

	json.NewEncoder(w).Encode(userUpdated)
}
