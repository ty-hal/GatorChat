## Demo Video:

https://youtu.be/G6EoC8FDVwU

## Work completed in Sprint 3

### Frontend:

- Edited header so it is fixed to the top of the page even when scrolling down.
  - As a user, I want to be able to quickly access the menu and navigate to the home page, so I made the header stick to the top of the page.
- Prevented header from displaying text (sign in/out, register, profile picture, etc.) until after all relevant data is fetched from the backend to prevent the user from appearing signed out momentarily if they were signed in.
  - As a user, I don't want the header to indicate that I am signed out even momentarily if I am actually logged in, so I will prevent the header text from displaying until after it is fetched.
- Edited white space that appears in dark mode above and below some of the web pages.
  - As a user, if I enable dark mode then I don't want to see any white space instead of the dark mode colored background, so I changed the web pages' minimum height to fit the screen.
- Restructured routes ...


### Backend:

- Created
  - As a user, 


---

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

**Section**: create thread, edit thread, delete thread

**Thread**: create thread, create reply, edit reply, edit thread, delete reply, delete thread

**Register**: successfully register account, try to register an existing account, try to register before entering all information

**Sign In**: successful login, successful login, remember me feature, forgot password, toggle show password

**ContactUs**: renders, enters name, enters email, does not submit.

**Settings**: renders, enters new name, tries to change email, enters new password, enters new major, submits.

**ForgotPassword**: renders,clicks "forgot password" enters email, submits email.

---

## Unit tests for backend:

### Threads:

**TestGetAllThreads**,
**TestGetThreadByIdValid**,
**TestGetThreadByIdInvalidParameter**,
**TestGetThreadByIdNotFound**,
**TestGetThreadPosts**,
**TestCreateThread**,
**TestDeleteThread**,

### Users:

**TestGetAllUsers**,
**TestGetUserByIdValid**,
**TestGetUserByIdInvalid**,
**TestGetUserByIdNotFound**,
**TestCreateUser**,
**TestCreateExistingUser**,
**TestDeleteUser**,

### Sections:

**TestGetAllSections**,
**TestGetSectionByIdValid**,
**TestGetSectionByIdInvalid**,
**TestGetSectionByIdNotFound**,

### Posts:

**TestGetAllPosts**,
**TestGetPostByIdValid**,
**TestGetPostByIdInvalid**,

---

## Documentation for backend API:

## Users

---

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
    "password": "Firstlast@1234"
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

### Get User Classes
Return list of user classes
- URL: `/api/users/:id/classes`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 

### Get User Majors
Return list of user majors
- URL: `/api/users/:id/majors`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 

### Sign User In

Return user

- URL: `/api/user/signin`
- Method: `PUT`
- Status Responses
  - 200 OK
  - 400 NOT FOUND
  - 401 UNAUTHORIZED

## Sections

---

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

### Get Group Parent
Return parent group of section
- URL: `/api/group/:id`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

### Get Group Children
Return children of group
- URL: `/api/group/:id`
- Method: `GET`
- Parameters: `id=[integer]`
- Status Responses
  - 200 OK 
  - 400 BAD REQUEST 
  - 404 NOT FOUND

## Threads

---

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
    "content": "Thread Content"
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

---

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
    "content": "Post Content"
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

### Get Classes
Return list of classes
- URL: `/api/classes`
- Method: `GET`
- Status Responses
  - 200 OK

### Get Majors
Return list of majors
- URL: `/api/majors`
- Method: `GET`
- Status Responses
  - 200 OK


### Like

Return Liked Thread/Post

- URL: `/api/like?activeUser=:id&threadID=:id&postID=:id`
- Method: `GET`
- Status Response
  - 200 OK
  - 400 BAD REQUEST

### Unlike

Return Unliked Thread/Post

- URL: `/api/unlike?activeUser=:id&threadID=:id&postID=:id`
- Method: `GET`
- Status Response
  - 200 OK
  - 400 BAD REQUEST
