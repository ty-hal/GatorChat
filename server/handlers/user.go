package handlers

import (
	"fmt"
	"net/http"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GET USERS")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GET USER")
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CREATE USER")
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DELETE USER")
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UPDATE USER")
}
