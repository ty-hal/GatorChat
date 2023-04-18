## Demo Video:

**LINK HERE**

## Work completed in Sprint 4

### Frontend:

- Edited header so it is fixed to the top of the page even when scrolling down.
  - As a user, I want to be able to quickly access the menu and navigate to the home page, so I made the header stick to the top of the page.
- Prevented header from displaying text (sign in/out, register, profile picture, etc.) until after all relevant data is fetched from the backend to prevent the user from appearing signed out momentarily if they were signed in.
  - As a user, I don't want the header to indicate that I am signed out even momentarily if I am actually logged in, so I will prevent the header text from displaying until after it is fetched.
- Edited white space that appears in dark mode above and below some of the web pages.
  - As a user, if I enable dark mode then I don't want to see any white space instead of the dark mode colored background, so I changed the web pages' minimum height to fit the screen.
- Restructured section and thread routes to accomodate for embedded sections
  - As a user, I want to access embedded sections (e.g. "Sports" -> "Football"), so I restructured our front end routing to allow for embedded sections.
- Added embedded section page
  - As a user, I want to see an embedded section and all of its child sections, so I created a template page that displays the parent and child sections.
- Added a button to request to create a section for embedded sections
  - As a user, I want to be able to create a section if it is currently not on Gator Chat, so I created a button to request for an admin to create the section.
- Edited section preview component
  - As a user, I want to see the section's name and description, so I created a component to display the section's description below the section's name.
- Added description to sections
  - As a user, I want to be able to see a section's description, so I edited the section page to display the section's description below the section's name.
- Implemented a toggle to save (bookmark) a section to the user's home page on the section preview and section pages.
  - As a user, I want to be able to quickly access any section that I regularly visit, so I created the option to save individual sections (embedded or not).
- Created display of user's saved sections in the home page.
  - As a user, I want to be able to quickly access the sections that I have saved to my account, so I created a user saved sectiosn display on the home page.
- Created a display of a user's information and statistics (likes given and received, number of threads and messages created, etc.) and all of their saved threads and messages and created threads and messages.
  - As a user, I want to be able to check information about my account and access messages and threads that I have saved, so I created a page to display this information.
- Implemented a toggle to save (bookmark) a thread.
  - As a user, I want to be able to easily access any thread, so I created the option to save any threads.
- Implemented a toggle to save (bookmark) a message.
  - As a user, I want to be able to easily access any message, so I created the option to save any messages.
- Fixed the search bar to not have transparent search results and to properly direct users to the appropiate thread page.
  - As a user, I want to be able to quickly access any section through the search bar, so I fixed the functionality of the search bar.
- Created a display of the number of threads each section has in the section preview.
  - As a user, I want to be able to see how many threads a section has, so I edited the section previews to display this at the bottom.
- Created a working reset password page that sends a code to the user's email and allows them to change their password using the code.
  - As a user, I want to be able to change my password if I cannot remember it, so I created a page to allow this.
- Created a working settings page that allows users to change information about their account, like password, profile picture, or major(s).
  - As a user, I want to be able to change information about my account, so I created a settings page to allow this.
  
  
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

**Section**: visits section, creates thread, edits thread, deletes thread, does not embed youtube video into thread.

**Thread**: likes thread, replies to thread, deletes reply to thread ,saves thread and unsaves thread, views thread replies, reports thread

**Register**: successfully register account,try to register an existing account, try to register before entering all information

**Sign In**: successful login, successful login, remember me feature, forgot password, toggle show password

**ContactUs**: renders, enters name, enters email, submits.

**Settings**: renders, does not allow name change, does not allow email change, enters new password, enters new major, uploads new profile picture, submits.

**ForgotPassword**: renders, clicks "forgot password" enters email, submits email, does not allow password to be reset without code

**savesection**: saves section and unsaves section, does not allow you to save a section if youre not signed in, searches within a section and saves that subsection.

**search**: searches for a section, searches for an invalid section and returns no results, searches for a subsection within a section.

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
