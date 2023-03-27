## Demo Video:
(add link)

## Work completed in Sprint 3
### Frontend:
- Created 
  - As a user,....

section and thread pages work for any section/thread instead of being a sample section/thread
like/report/delete thread/message functionality and popups
user sign in popup if they try to modify a thread/post without being signed in
skeleton components for thread preview/post and message post
get user authentication cookie from browser
after sign in, create user auth cookie
after log out, delete user auth cookie
added search bar to home page to search for a specific section
certain text/buttons header and footer adjusts if user is signed in or not
edited profile picture in header to display user's profile picture if logged in
email cannot be changed after signing up
can send an email if i forgot my password
can create a thread

### Backend:
- ......
  - As a user, ....

created handler for deleting auth cookie
edited user sign in handler to create auth cookie and store in browser
created handler to check for user auth cookie

___
## Unit tests and Cypress test for frontend
### Unit (Cypress component) tests: 
**Accordion**: renders, collapsed question, expanded question

**CreateThread**: renders, open create thread, minimize create thread, create a thread, thread title over 300 chars

**Footer**: renders, navigate to FAQ page, navigate to settings page, navigate to contact-us page, navigate to sign-in page, navigate to register page, navigate to terms-and-conditions page

**Header**: renders, click logo, navigate to home page, navigate to sign-in page, navigate to register page, navigate to settings page, toggle dark/light mode, click sign-out button

**MessageBox**: renders, enter text, enter emoji, submit message

**MessageFormat**: renders, default profile picture exists, message time posted relative to current time, add a like to the message, dropdown menu copy message

**ProfilePicture**: renders, profile picture exists

**RichTextEditor**: renders, enter text, undo button, character count

**ThreadPost**: renders, default profile picture exists, thread time posted relative to current time, add a like to the thread

**ThreadPreview**: renders, default profile picture exists, thread time posted relative to current time, add a like to the thread

### Cypress (end-to-end) tests:
**Register**: successfully register account, try to register an existing account, try to register before entering all information

**Sign In**:, unsuccessful login, successful login, remember me feature, forgot password, toggle show password

**ContactUs**: renders, enters name, enters email, does not submit.

**Settings**: renders, enters new name, tries to change email, enters new password, enters new major, submits.

**createthread**:renders, logs in, clicks "create thread", types in title, types in body, submits thread.

**forgotpassword**:renders,clicks "forgot password" enters email, submits email.
___
## Unit tests for backend:
### Threads: 
**TestGetAllThreads**,
**TestGetThreadByIdValid**,
**TestGetThreadByIdInvalidParameter**,
**TestGetThreadByIdNotFound**,
**TestGetThreadPosts**,
### Users: 
**TestGetAllUsers**,
**TestGetUserByIdValid**,
**TestGetUserByIdInvalid**,
**TestGetUserByIdNotFound**,
### Sections:
**TestGetAllSections**,
**TestGetSectionByIdValid**,
**TestGetSectionByIdInvalid**,
**TestGetSectionByIdNotFound**,
### Posts:
**TestGetAllPosts**,
**TestGetPostByIdValid**,
**TestGetPostByIdInvalid**,

___
## Documentation for backend API:
## Users 
___

### Get Users
Return list of user objects
- URL: `/api/users`
- Method: `GET`
- Status Responses
  - 200 OK 

### Get User By Id
Return user
- URL: `/api/user/:id`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Create User
Return user created
- URL: `/api/user`
- Method: `POST`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 409 STATUS CONFLICT
- Example Body
  ```json
    {
      "first_name": "First",
      "last_name": "Last",
      "email": "firstlast@ufl.edu",
      "password": "Firstlast@1234",
    }
  ```

### Delete User
Return user deleted
- URL: `/api/user/`
- Method: `DELETE`
- Parameters: `user=[User]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Update User
Return user updated
- URL: `/api/user/`
- Method: `PUT`
- Parameters: `user=[User]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Sign User In
Return user
- URL: `/api/user/signin`
- Method: `PUT`
- Status Responses
  - 200 OK 
  - 400 NOT FOUND
  - 401 UNAUTHORIZED

## Sections
___

### Get Sections
Return list of section objects
- URL: `/api/sections`
- Method: `GET`
- Status Responses
  - 200 OK 

### Get Section By Id
Return section
- URL: `/api/section/:id`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Get Section Threads
Return list of thread objects
- URL: `/api/section/:id/threads`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

## Threads
___

### Get Threads
Return list of section threads
- URL: `/api/threads`
- Method: `GET`
- Status Responses
  - 200 OK 

### Get Thread By Id
Return thread
- URL: `/api/thread/:id`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Create Thread
Return thread created
- URL: `/api/thread`
- Method: `POST`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 409 STATUS CONFLICT

- Example Body
  ```json
    {
      "user_id": 1,
      "section_id": 1,
      "thread_title": "Thread Title",
      "content": "Thread Content",
    }
  ```

### Delete Thread
Return thread deleted
- URL: `/api/thread/`
- Method: `DELETE`
- Parameters: `thread=[Thread]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Update Thread
Return thread updated
- URL: `/api/thread/`
- Method: `PUT`
- Parameters: `thread=[Thread]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Get Thread Posts
Return list of thread objects
- URL: `/api/thread/:id/posts`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

## Posts
___

### Get Posts
Return list of section posts
- URL: `/api/posts`
- Method: `GET`
- Status Responses
  - 200 OK 

### Get Post By Id
Return post
- URL: `/api/post/:id`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Create Post
Return thread created
- URL: `/api/post`
- Method: `POST`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 409 STATUS CONFLICT
- Example Body
  ```json
    {
      "user_id": 1,
      "thread_id": 1,
      "content": "Post Content",
    }
  ```

### Delete Post
Return post deleted
- URL: `/api/post/`
- Method: `DELETE`
- Parameters: `post=[Post]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Update Post
Return post updated
- URL: `/api/post/`
- Method: `PUT`
- Parameters: `post=[Post]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

