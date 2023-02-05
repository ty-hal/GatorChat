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

	fmt.Println("Creator: " + creator.FirstName)

	posts := thread.GetPosts()

	for _, post := range posts {
		fmt.Println("Post: " + post.Content)
	}

	log.Fatal(http.ListenAndServe(":9000", corsHandler.Handler(r)))

}
