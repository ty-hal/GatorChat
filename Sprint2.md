## Work completed in Sprint 2
### Frontend:
- Created settings page where users can edit their account information.
  - As a user, I want to be able to edit my name, profile picture, major, age, etc all in one webpage for easiest use. Therefore, I, as a developer, will create a settings page.
- Created contact us page where users can fill out a text area to contact the Gator Chat developers about anything.
  - As a user, I want to be able to find contact information for the maintainers of the website. Therefore, I, as a developer, will create a contactus page.
- Save sign in and registration information to session storage to prevent user inputted fields from clearing upon refresh or page change.
  - As a user, I do not want to lose all of the information I inputted if I toggle dark/light mode, refresh the page, or leave the page, so I will save the relevant user information to the session storage and retrieve it on page render.
- Created working "remember me" functionality to sign in page by saving user email and password to local storage if the input box is checked.
  - As a user, I want to be able to quickly sign in and have my information saved to my browser, so I will save the user's email and password in their browser's local storage.
- Created a multi-select dropdown button for majors in the registration page to allow users to input more than one major.
  - As a user, I want to be able to add more than one major in the registration page so I will create a multi-select dropdown menu for majors.
- Created a Rich Text Editor (RTE) component that is currently used for creating thread posts.
  - As a user I want to be able to create new thread posts, so I will create the components to create thread posts for our web app.
- Created a component to create threads that takes in a user inputted title and text (from the RTE), which is linked to the backend and is working. 
  - As a user, I want to be able to easily create threads, so I will create a component to create threads by entering a title and text, and submitting it.
- Edited the thread and message components to display the post date relative to the current time, like "posted 2 hours ago" or "posted 17 days ago".
  - As a user, I want to easily see how long ago something was posted relative to the current time, so I will update this relative post date next to the username.
- Configured Cypress and created numerous component and end-to-end tests to cover most of our web app functionality.

### Backend:
- Implemented infinite scroller for threads so when the user scrolls to the bottom of the screen, new threads are loaded.
  - As a user, I want my experience to be smooth and quick, so as a developer I will reduce lag by adding pagination.
- When home page is loaded, grab sections from database. When section is clicked, grab threads for that section.
  - As as user, I want to see all the sections and threads, so I will grab them from the database and display them to the screen
- Create handlers for Sections/Threads/Posts that follow the layout of the User handler created in Sprint 1.
  - As a developer, I want my request to be handled in an organized way, so I will create handlers to verify and organize requests.
- Create queries, functions, and handlers for Posts/Threads/Users for deletion of rows in the database.
  - As a user, I want to be able to delete posts, threads, or my account, so I will create handlers to send delete requests.
- Fix creation date of Posts/Threads/Users to accurately store time using timestamptz
  - As a user, I want to see when my post, thread, and account were created in my time zone, so I will store the posts', threads', and users' creation dates as a timestamptz.
- Create queries, functions, and handlers for Posts/Threads/Users for updating rows in the database.
  - As a user, I want to be able to edit and update posts, threads, or my account, so I will create handlers to send update requests.
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
