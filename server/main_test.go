package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/team/swe-project/models"
	"github.com/team/swe-project/router"
)

var newRouter mux.Router

func TestSetRouter(t *testing.T) {
	newRouter = *router.Router()
}

// ------------- THREAD TESTS ------------- //
func TestGetAllThreads(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/threads", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Thread
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIST OF THREADS: got %v", rr.Body.String())
	}
}

func TestGetThreadByIdValid(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:9000/api/thread/2", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Thread
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED THREAD: got %v", rr.Body.String())
	}
}

func TestGetThreadByIdInvalidParameter(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:9000/api/thread/no-string", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("STATUS CODE EXPECTED 400: got %v want %v",
			status, http.StatusBadRequest)
	}
}

func TestGetThreadByIdNotFound(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:9000/api/thread/100", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNotFound {
		t.Errorf("STATUS CODE EXPECTED 404: got %v want %v",
			status, http.StatusNotFound)
	}
}

func TestGetThreadPosts(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:9000/api/thread/1/posts", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Post
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIST OF POSTS: got %v", rr.Body.String())
	}
}

// ------------- USER TESTS ------------- //
func TestGetAllUsers(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/users", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.User
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIST OF USERS: got %v", rr.Body.String())
	}
}

func TestGetUserByIdValid(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/1", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.User
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED USER: got %v", rr.Body.String())
	}
}

func TestGetUserByIdInvalid(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/no-string", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("STATUS CODE EXPECTED 400: got %v want %v",
			status, http.StatusBadRequest)
	}
}

func TestGetUserByIdNotFound(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/100", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNotFound {
		t.Errorf("STATUS CODE EXPECTED 400: got %v want %v",
			status, http.StatusNotFound)
	}
}

// ------------- SECTION TESTS ------------- //
func TestGetAllSections(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/sections", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Section
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIST OF SECTIONS: got %v", rr.Body.String())
	}
}

func TestGetSectionByIdValid(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/section/1", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Section
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED SECTION: got %v", rr.Body.String())
	}
}

func TestGetSectionByIdInvalid(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/section/no-string", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("STATUS CODE EXPECTED 400: got %v want %v",
			status, http.StatusBadRequest)
	}
}

func TestGetSectionByIdNotFound(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/section/100", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNotFound {
		t.Errorf("STATUS CODE EXPECTED 400: got %v want %v",
			status, http.StatusNotFound)
	}
}

// ------------- POST TESTS ------------- //
func TestGetAllPosts(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/posts", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Post
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIST OF POSTS: got %v", rr.Body.String())
	}
}

func TestGetPostByIdValid(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/post/1", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Post
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED POST: got %v", rr.Body.String())
	}
}

func TestGetPostByIdInvalid(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/post/no-string", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("STATUS CODE EXPECTED 400: got %v want %v",
			status, http.StatusBadRequest)
	}
}

// func TestCreateUser(t *testing.T) {
// 	body, _ := json.Marshal(models.User{
// 		FirstName: "test",
// 		LastName:  "test2",
// 		Email:     "test12345@ufl.edu",
// 		Password:  "Randomtest123",
// 	})

// 	req, err := http.NewRequest("POST", "/api/user", bytes.NewBuffer(body))

// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	rr := httptest.NewRecorder()

// 	newRouter.ServeHTTP(rr, req)

// 	if status := rr.Code; status != http.StatusOK {
// 		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
// 			status, http.StatusOK)
// 	}

// 	var response models.User
// 	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
// 		t.Errorf("RESPONSE EXPECTED USER: got %v", rr.Body.String())
// 	}
// }

// func TestCreateUserEmailExists(t *testing.T) {
// 	body, _ := json.Marshal(models.User{
// 		FirstName: "test",
// 		LastName:  "test2",
// 		Email:     "random@ufl.edu",
// 		Password:  "Randomtest123",
// 	})

// 	req, err := http.NewRequest("POST", "/api/user", bytes.NewBuffer(body))

// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	rr := httptest.NewRecorder()

// 	newRouter.ServeHTTP(rr, req)

// 	if status := rr.Code; status != http.StatusConflict {
// 		t.Errorf("STATUS CODE EXPECTED 409: got %v want %v",
// 			status, http.StatusOK)
// 	}
// }

// func TestDeleteUser(t *testing.T) {
// 	req, err := http.NewRequest("DELETE", "/api/user/8", nil)

// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	rr := httptest.NewRecorder()

// 	newRouter.ServeHTTP(rr, req)

// 	if status := rr.Code; status != http.StatusOK {
// 		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
// 			status, http.StatusOK)
// 	}

// 	var response models.User
// 	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
// 		t.Errorf("RESPONSE EXPECTED USER: got %v", rr.Body.String())
// 	}
// }

// func TestDeleteThread(t *testing.T) {
// 	req, err := http.NewRequest("DELETE", "/api/thread/9", nil)

// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	rr := httptest.NewRecorder()

// 	newRouter.ServeHTTP(rr, req)

// 	if status := rr.Code; status != http.StatusOK {
// 		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
// 			status, http.StatusOK)
// 	}
// }

// func TestDeletePost(t *testing.T) {
// 	req, err := http.NewRequest("DELETE", "/api/post/5", nil)

// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	rr := httptest.NewRecorder()

// 	newRouter.ServeHTTP(rr, req)

// 	if status := rr.Code; status != http.StatusOK {
// 		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
// 			status, http.StatusOK)
// 	}
// }

func TestGetStats(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/stats", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Stats
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED STATS: got %v", rr.Body.String())
	}
}

func TestLikeThread(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/like?activeUser=18&threadID=6&postID=0", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Likes
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIKES: got %v", rr.Body.String())
	}
}

func TestUnlikeThread(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/unlike?activeUser=18&threadID=6&postID=0", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Likes
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIKES: got %v", rr.Body.String())
	}
}

func TestLikePost(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/like?activeUser=18&threadID=0&postID=17", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Likes
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIKES: got %v", rr.Body.String())
	}
}

func TestUnLikePost(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/unlike?activeUser=18&threadID=0&postID=17", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response models.Likes
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED LIKES: got %v", rr.Body.String())
	}
}

func TestGetMajors(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/majors", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Major
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED MAJORS: got %v", rr.Body.String())
	}
}

func TestGetClasses(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/classes", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Class
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED CLASSES: got %v", rr.Body.String())
	}
}

func TestGetRoles(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/roles", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Role
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED ROLES: got %v", rr.Body.String())
	}
}

func TestGetCreatedThreads(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/createdthreads?pageNumber=1&pageSize=4", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Thread
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED THREADS: got %v", rr.Body.String())
	}
}

func TestGetCreatedPosts(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/createdposts?pageNumber=1&pageSize=4", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Post
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED POSTS: got %v", rr.Body.String())
	}
}

func TestGetSavedThreads(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/savedthreads?pageNumber=1&pageSize=4", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Thread
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED THREADS: got %v", rr.Body.String())
	}
}

func TestGetSavedPosts(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/savedposts?pageNumber=1&pageSize=4", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Post
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED POSTS: got %v", rr.Body.String())
	}
}

func TestGetSavedSections(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user/18/savedsections", nil)

	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()

	newRouter.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("STATUS CODE EXPECTED 200: got %v want %v",
			status, http.StatusOK)
	}

	var response []models.Section
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("RESPONSE EXPECTED SECTIONS: got %v", rr.Body.String())
	}
}
