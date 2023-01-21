package middleware

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Database instance
var DB *gorm.DB

func Init() {
	// Setup connection to PostgreSQL database
	dsn := "host=localhost user=postgres password=password dbname=SWEProject port=5432"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	DB = db
}
