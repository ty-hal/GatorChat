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

	return router
}
