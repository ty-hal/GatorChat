## Work completed in Sprint 2
### Frontend:
- Created settings page where users can edit their account information.
- Created contact us page where users can fill out a text area to contact the Gator Chat developers about anything.
- Save sign in and registration information to session storage to prevent user inputted fields from clearing upon refresh or page change.
- Created working "remember me" functionality to sign in page by saving user email and password to local storage if the input box is checked.
- Created a multi-select dropdown button for majors in the registration page to allow users to input more than one major.
- Created a Rich Text Editor (RTE) component that is currently used for creating thread posts.
- Created a component to create threads that takes in a user inputted title and text (from the RTE), which is linked to the backend and is working. 
- Edited the thread and message components to display the post date relative to the current time, like "posted 2 hours ago" or "posted 17 days ago".
- Configured Cypress and created numerous component and end-to-end tests to cover most of our web app functionality.

### Backend:
(WRITE STUFF)

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

## Unit tests for backend:
(WRITE STUFF)

## Documentation for backend API:
(WRITE STUFF)
