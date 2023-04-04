package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
)

func ContactUs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type Contact struct {
		Email   string `json:"email,omitempty"`
		Name    string `json:"name,omitempty"`
		Message string `json:"message,omitempty"`
	}

	var contact Contact
	json.NewDecoder(r.Body).Decode(&contact)

	envError := godotenv.Load(".env")

	if envError != nil {
		log.Fatal("Error loading .env file")
	}

	host := "smtp.gmail.com"
	port := "587"
	user := os.Getenv("app_user")
	pass := os.Getenv("app_password")

	from := user
	to := user
	subject := "New Contact from " + contact.Email
	body := "From: " + contact.Email + "\n" + "Name: " + contact.Name + "\n" + "Message: " + contact.Message

	message := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n\n" +
		body

	auth := smtp.PlainAuth("", user, pass, host)
	err := smtp.SendMail(host+":"+port, auth, from, []string{to}, []byte(message))
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(contact)
}
