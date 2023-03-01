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
	router.HandleFunc("/api/user/{id}", handlers.GetUserById).Methods("GET")
	router.HandleFunc("/api/user", handlers.CreateUser).Methods("POST")
	router.HandleFunc("/api/user/signin", handlers.SignIn).Methods("POST")
	router.HandleFunc("/api/user/{id}", handlers.DeleteUser).Methods("DELETE")
	router.HandleFunc("/api/user/{id}", handlers.UpdateUser).Methods("PUT")

	// Section Routes
	router.HandleFunc("/api/sections", handlers.GetAllSections).Methods("GET")
	router.HandleFunc("/api/section/{id}", handlers.GetSectionById).Methods("GET")
	router.HandleFunc("/api/section/{id}/threads", handlers.GetSectionThreads).Methods("GET")

	// Thread Routes
	router.HandleFunc("/api/threads", handlers.GetAllThreads).Methods("GET")
	router.HandleFunc("/api/thread/{id}", handlers.GetThreadById).Methods("GET")
	router.HandleFunc("/api/thread/{id}/posts", handlers.GetThreadPosts).Methods("GET")
	router.HandleFunc("/api/thread", handlers.CreateThread).Methods("POST")
	router.HandleFunc("/api/thread", handlers.DeleteThread).Methods("DELETE")
	router.HandleFunc("/api/thread", handlers.UpdateThread).Methods("PUT")

	// Post Routes
	router.HandleFunc("/api/posts", handlers.GetAllPosts).Methods("GET")
	router.HandleFunc("/api/post/{id}", handlers.GetPostById).Methods("GET")
	router.HandleFunc("/api/post", handlers.CreatePost).Methods("POST")
	router.HandleFunc("/api/post", handlers.DeletePost).Methods("DELETE")
	router.HandleFunc("/api/post", handlers.UpdatePost).Methods("PUT")

	// Class Routes
	router.HandleFunc("/api/classes", handlers.GetAllClasses).Methods("GET")

	// Major Routes
	router.HandleFunc("/api/majors", handlers.GetAllMajors).Methods("GET")

	// Role Routes
	router.HandleFunc("/api/roles", handlers.GetAllRoles).Methods("GET")

	return router
}
