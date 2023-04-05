package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"

	"github.com/team/swe-project/middleware"
	"github.com/team/swe-project/router"
)

func main() {
	r := router.Router()
	middleware.Init()

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
	})

	fmt.Println("starting the server on port 9000...")

	log.Fatal(http.ListenAndServe("localhost:9000", corsHandler.Handler(r)))

	// Close database connection
	sqlDB, _ := middleware.DB.DB()
	defer sqlDB.Close()
}
