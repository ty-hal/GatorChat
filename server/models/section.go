package models

import (
	"fmt"

	"github.com/team/swe-project/middleware"
)

type Section struct {
	SectionID     uint8  `json:"section_id" gorm:"primary_key"`
	SectionName   string `json:"section_name"`
	GroupID       uint   `json:"group_id"`
	ParentSection bool   `json:"parent_section"`
}

func GetAllSections() []Section {
	var sections []Section

	middleware.DB.Find(&sections)

	return sections
}

func GetSectionByID(section_id uint8) (Section, error) {
	var section Section

	err := middleware.DB.First(&section, section_id).Error

	if err != nil {
		return Section{}, err
	}

	return section, nil
}

func GetSectionThreads(section_id uint8, pageNumber int, pageSize int, activeUser uint8) []Thread {
	var threads []Thread

	for _, thread := range GetAllThreadsWithOffset(pageNumber, pageSize) {
		if thread.SectionID == section_id {
			creator, err := GetUserByID(thread.UserID)
			fmt.Print(thread.UserID)
			if err != nil {
				thread.User = "[DELETED]"
			} else {
				thread.User = creator.FirstName + " " + creator.LastName
			}

			thread.UserLiked = CheckThreadLike(activeUser, thread.ThreadID)

			threads = append(threads, thread)
		}
	}

	return threads
}

func GetSectionsByGroup(group_id uint) []Section {
	var group []Section

	middleware.DB.Find(&group, "group_id = ?", group_id)

	return group
}
