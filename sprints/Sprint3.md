## Demo Video:

https://youtu.be/G6EoC8FDVwU

## Work completed in Sprint 3

### Frontend:

- Edited section and thread pages to be templates for any section/thread instead of just one sample section page and one thread page.
  - As a user, I want to be able to access any section and thread instead of just a sample, so I created the template pages for sections and threads.
- Created popups and working functionality for liking, reporting, and deleting a thread/message.
  - As a user, I want to be able to like, report, and delete a thread or message, so I created popups and functional buttons for doing so.
- Created a popup that prompts the user to sign in if they try to modify a thread or message without being signed in.
  - As a user, I want to be able to modify threads or messages only if I'm signed in, so I edited the features/buttons accordingly.
- Created skeleton components for threads and messages that are disiplayed while the data is being fetched.
  - As a user, I don't want to see partially loaded data, so I created skeleton components to be displayed until the data is fetched.
- Retrieve user authentication cookie from browser upon window refresh.
  - As a user, I want to be able stay logged in upon refresh, so I check the user auth cookie from the browser.
- Edited signing in functionality to create a user auth cookie.
  - As a user, I want to be able stay logged in upon refresh, so I call the backend handler to create and store the user auth cookie in the browser.
- Edited logging out functionality to delete user auth cookie.
  - As a user, I want to be able successfully logout, so I call the backend handler to delete the user auth cookie in the browser.
- Added search bar to home page to search for a specific section.
  - As a user, I want to be able to search for a specific section, so I created a search bar to do so.
- Edited profile picture display in the right side of the header to display the user's profile picture if they are signed in.
  - As a user, I want to be able to easily discern if I'm logged into my account, so I display the user's profile picture in the top right of the header.
- Edited settings page to prevent user from changing email.
  - As a user, I cannot change my account's email address in order to protect my account, so I prevented the user from changing their email address in the settings.
- Edited forgot my password page to send an email upon request.
  - As a user, I want to be able to change my password if I forget it, so I created the functionality to do so.

### Backend:

- Created like and unlike system
  - As a user, I want to be able to like and unlike certain threads/posts, so I will create a liking system to do so
- Created handler to check for user auth cookie
  - As a user, I want to stay signed in, so I will create a cookie that will contain my securely contain my login information for future use.
- Created handler for deleting auth cookie
  - As a developer I want the auth cookie to be deleted, so I will create a delete method for ceratin senarios
- Created handlers to retrieve a user's classes and majors
  - As a user, I want to see other user's classes and majors, so I will use handlers to connect to the frontend to display the user's data.
- Created embedded structures that organize sections inside one another to create a more organized layout
  - As a user, I want to be able to easily navigate through sections, so I will create embedded sections that properly organize other sections/threads.
- Changed handler parameters to integers from structs for deleting and updating threads/posts
  - As a developer, I want to easily delete and update threads by their ID instead of struct, so I will change the handler parameters to integer to allow for easy manipulation.
- Edited user sign in handler to create auth cookie and store in browser

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
