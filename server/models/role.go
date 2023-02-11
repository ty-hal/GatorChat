package models

import (
	"github.com/team/swe-project/middleware"
)

type Role struct {
	RoleID   uint8  `json:"role_id" gorm:"primary_key"`
	RoleName string `json:"role_name,omitempty"`
}

func GetAllRoles() []Role {
	var roles []Role

	middleware.DB.Find(&roles)

	return roles
}

func GetRoleByID(role_id uint8) Role {
	var role Role

	middleware.DB.First(&role, role_id)

	return role
}
