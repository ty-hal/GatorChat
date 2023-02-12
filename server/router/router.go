package router

import (
	"github.com/gorilla/mux"

	"github.com/team/swe-project/handlers"
	"github.com/team/swe-project/middleware"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	middleware.Init()

	// User Routes
	router.HandleFunc("/api/users", handlers.GetAllUsers).Methods("GET")
	router.HandleFunc("/api/user/{id}", handlers.GetUser).Methods("GET")
	router.HandleFunc("/api/user", handlers.CreateUser).Methods("POST")
	router.HandleFunc("/api/user/signin", handlers.SignIn).Methods("POST")
	router.HandleFunc("/api/user/{id}", handlers.DeleteUser).Methods("DELETE")
	router.HandleFunc("/api/user/{id}", handlers.UpdateUser).Methods("PUT")

	// Class Routes
	router.HandleFunc("/api/classes", handlers.GetAllClasses).Methods("GET")

	// Major Routes
	router.HandleFunc("/api/majors", handlers.GetAllMajors).Methods("GET")

	// Role Routes
	router.HandleFunc("/api/roles", handlers.GetAllRoles).Methods("GET")

	return router
}
