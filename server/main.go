package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/team/swe-project/middleware"
	"github.com/team/swe-project/models"
	"github.com/team/swe-project/router"
)

func main() {
	r := router.Router()
	middleware.Init()

	middleware.DB.AutoMigrate(&models.User{})

	fmt.Println("starting the server on port 9000...")

	log.Fatal(http.ListenAndServe(":9000", r))
}
