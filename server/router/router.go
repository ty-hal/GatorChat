package router

import (
	"github.com/gorilla/mux"
	"github.com/team/swe-project/handlers"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	// User Routes
	router.HandleFunc("/api/users", handlers.GetAllUsers).Methods("GET")
	router.HandleFunc("/api/user/{id}", handlers.GetUser).Methods("GET")
	router.HandleFunc("/api/user", handlers.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", handlers.DeleteUser).Methods("DELETE")
	router.HandleFunc("/api/user/{id}", handlers.UpdateUser).Methods("PUT")

	return router
}
