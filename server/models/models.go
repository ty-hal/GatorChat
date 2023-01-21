package models

type User struct {
	ID             int    `json:"_id,omitempty"`
	Email          string `json:"email,omitempty"`
	Password       bool   `json:"password,omitempty"`
	Major          string `json:"major,omitempty"`
	ProfilePicture string `json:"profile_picture,omitempty"`
}
