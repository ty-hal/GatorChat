package models

import (
	"github.com/team/swe-project/middleware"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Likes struct {
	UserID   uint8 `json:"user_id"`
	ThreadID uint8 `json:"thread_id"`
	PostID   uint8 `json:"post_id"`
}

func GetLikesByUser(user_id uint8) []Likes {
	var likes []Likes

	middleware.DB.Where("user_id = ?", user_id).Find(&likes)

	return likes
}

func CheckThreadLike(user_id uint8, thread_id uint8) bool {
	var like Likes

	r := middleware.DB.Where("user_id = ? AND thread_id = ?", user_id, thread_id).Find(&like)

	return r.RowsAffected > 0
}

func CheckMessageLike(user_id uint8, post_id uint8) bool {
	var like Likes

	r := middleware.DB.Where("user_id = ? AND post_id = ?", user_id, post_id).Find(&like)

	return r.RowsAffected > 0
}

func Like(user_id uint8, thread_id uint8, post_id uint8) Likes {
	like := Likes{UserID: user_id, ThreadID: thread_id, PostID: post_id}
	middleware.DB.Create(&like)

	if thread_id != 0 {
		middleware.DB.Table("threads").Where("thread_id = ?", thread_id).Omit("updated_at").Update("likes", gorm.Expr("likes + ?", 1))
	} else {
		middleware.DB.Table("posts").Where("post_id = ?", post_id).Omit("updated_at").Update("likes", gorm.Expr("likes + ?", 1))
	}

	return like
}

func UnLike(user_id uint8, thread_id uint8, post_id uint8) Likes {
	var like Likes
	middleware.DB.Clauses(clause.Returning{}).Unscoped().Where("user_id = ? AND thread_id = ? AND post_id = ?", user_id, thread_id, post_id).Delete(&like)

	if thread_id != 0 {
		middleware.DB.Table("threads").Where("thread_id = ?", thread_id).Omit("updated_at").Update("likes", gorm.Expr("likes + ?", -1))
	} else {
		middleware.DB.Table("posts").Where("post_id = ?", post_id).Omit("updated_at").Update("likes", gorm.Expr("likes + ?", -1))
	}

	return like
}
