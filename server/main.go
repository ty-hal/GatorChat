package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"

	"github.com/team/swe-project/middleware"
	"github.com/team/swe-project/models"
	"github.com/team/swe-project/router"
)

func main() {
	r := router.Router()
	middleware.Init()

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
	})

	fmt.Println("starting the server on port 9000...")

	thread := models.GetThreadById(1)
	creator, err := thread.GetCreator()

	if err != nil {
		fmt.Println("error in finding creator")
	}

	fmt.Println()
	fmt.Println(creator.FirstName + " " + creator.LastName + "'s Classes: ")
	for _, class := range creator.GetClasses() {
		fmt.Println(class.ClassName)
	}

	fmt.Println()
	fmt.Println(creator.FirstName + " " + creator.LastName + "'s Roles: ")
	for _, role := range creator.GetRoles() {
		fmt.Println(role.RoleName)
	}

	fmt.Println()
	fmt.Println(creator.FirstName + " " + creator.LastName + "'s Majors: ")
	for _, major := range creator.GetMajors() {
		fmt.Println(major.MajorName)
	}

	fmt.Println()
	fmt.Println("Thread: " + thread.ThreadTitle)
	fmt.Println(thread.Content)
	fmt.Println("Posted on:", thread.CreationDate, "by "+creator.FirstName+" "+creator.LastName)
	fmt.Println()

	posts := thread.GetPosts()

	for _, post := range posts {
		postCreator, postErr := post.GetCreator()

		if postErr != nil {
			fmt.Println("error in finding creator")
		}

		fmt.Println(" - " + post.Content)
		fmt.Println("Posted on:", post.CreationDate, "by "+postCreator.FirstName+" "+postCreator.LastName)
	}

	log.Fatal(http.ListenAndServe(":9000", corsHandler.Handler(r)))

}
