package router

import (
	"fmt"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/handlers"
	"github.com/team/swe-project/middleware"
	"github.com/team/swe-project/models"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	middleware.Init()

	// User Routes
	router.HandleFunc("/api/users", handlers.GetAllUsers).Methods("GET")
	router.HandleFunc("/api/user/{id}", handlers.GetUser).Methods("GET")
	router.HandleFunc("/api/user", handlers.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", handlers.DeleteUser).Methods("DELETE")
	router.HandleFunc("/api/user/{id}", handlers.UpdateUser).Methods("PUT")

	// Test getting user
	user := models.GetUser(1)
	fmt.Printf("name:%v    | email:%v\n", user.FirstName, user.Email)

	return router
}
