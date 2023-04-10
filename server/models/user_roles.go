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

func GetUserRoleRowsFromUser(userID uint8) []UserRoles {
	var userRoleRows []UserRoles

	middleware.DB.Find(&userRoleRows, "user_id = ?", userID)

	return userRoleRows
}

func GetAllRolesFromUser(userID uint8) []Role {
	var userRoles []Role

	for _, userRoleRow := range GetUserRoleRowsFromUser(userID) {
		if userRoleRow.UserID == userID {
			role, err := GetRoleByID(userRoleRow.RoleID)
			if err == nil {
				userRoles = append(userRoles, role)
			}
		}
	}

	return userRoles
}
