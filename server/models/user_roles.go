package models

import (
	"github.com/team/swe-project/middleware"
)

type UserRoles struct {
	UserRoleID uint8 `json:"user_role_id" gorm:"primary_key"`
	RoleID     uint8 `json:"role_id,omitempty"`
	UserID     uint8 `json:"user_id,omitempty"`
}

func GetAllUserRoleRows() []UserRoles {
	var userRoles []UserRoles

	middleware.DB.Find(&userRoles)

	return userRoles
}

func GetAllUserRoleRowsFromUser(user User) []UserRoles {
	var userRoleRows []UserRoles

	for _, userRoleRow := range GetAllUserRoleRows() {
		if userRoleRow.UserID == user.UserID {
			userRoleRows = append(userRoleRows, userRoleRow)
		}
	}

	return userRoleRows
}
