# Adv_web_test2

# Discussion Board App
Yes, i used Ai like copilot, etc for this project to generate codes and for making my page more elegant and i will expalin in the upcoming lines. Furthermore,this is a React-based Discussion Board Application with login/signup, password reset, verification code authentication, and a fully interactive discussion system with navigation bars, copywright and other some options. 
The project demonstrates frontend development with React hooks, Bootstrap, custom CSS, and Springboot which i was implemented in backend.

## Here i am going to explain the features that i implemented in this project:

1. Authentication
  - Signup with username, password, email, and phone.
  - Password strength meter: Weak → Average → Strong.
  - Verification code for login.
  - Forgot password with 3-step recovery.

2. Discussion Board
  - Create new discussions.
  - Like/Dislike system per discussion.
  - Add, delete, and comment on posts.
  - Only the discussion creator can add posts.

3. Styling & Layout
  - Bootstrap for responsive UI.
  - Hero section with background image.
  - Three-column info section with images & text.
  - Custom background images for login & discussion board.
  - Navbar + Footer for polished layout.


## her i expalin my codes:

My App.js file is divided into various logical sections:

1. Authentication Logic-- handleLoginSignup, handleVerifyLoginCode, handleForgotPasswordStep 
  Handles login, signup, and password reset with error validation by which user will validate and signup or signin securely.

2. Password Strength-- getPasswordStrength
  Dynamically checks password strength and shows feedback with Bootstrap text colors like password strength- weak, average, strong by which user can create strong password for his/ her app.

3. Discussion Functions-- 
  - addDiscussion -> Adds new discussion with unique ID such as Discussion1, 2, 3 etc. 
  - toggleDiscussionLike, toggleDiscussionDislike → Handles likes/dislikes immutably to like discussions.  
  - addPost, deletePost → Manage posts and and files which was uploaded by user and after user have need to go out and when user click on the the discussion then he will see his comments and files that he was added before in the discussion but only one user can edit that post who created that, not other user.

4. UI Sections--
  - Auth Screens → Login, Signup, Forgot password, and Verification code.
  - Hero Section → Welcoming image and heading.
  - Three-Column Section → Images + text for extra layout variety.
  - Discussion Board Section → Full CRUD (create, read, update, delete) discussions.
  - Footer → Branding and copyright.

