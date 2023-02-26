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
(WRITE STUFF)
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
(WRITE STUFF)
___
## Documentation for backend API:
(WRITE STUFF)
