# Adv_web_test2

# Discussion Board App
Yes, i used Ai like copilot, etc for this project to generate codes and for making my page more elegant and i will expalin in the upcoming lines what i update and modify the codes. Furthermore,this is a React-based Discussion Board Application with login/signup, password reset, verification code authentication, and a fully interactive discussion system with navigation bars, copywright and other some options. 
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
  - Hero Section →  for Welcoming image and heading.
  - Three-Column Section → Images + text for extra layout variety inm the page.
  - Discussion Board Section → Full CRUD (create, read, update, delete) discussions.
  - Footer → Branding and copyright and show pop up message on

// Here is the codes that was genreated by AI to take just ideas for the codes--

1. // Checks only password length, ignores other factors
function getPasswordStrength(pwd) {
  if (pwd.length > 8) return "Strong";
  return "Weak";
}

2.// Only checks username/password, no verification step
if (users[username] && users[username].password === passwordInput) {
  setUser(username);
}

3. // Directly modifies array, React may not re-render
function toggleDiscussionLike(id) {
  const d = discussions.find(d => d.id === id);
  d.likes.push(user);
}

4. // Only supports text, no images or comments
function addPost(discussionId, text) {
  setDiscussions([...discussions, { text }]);
}

// Now here is the codes that i modified and implement in the files:

1. const getPasswordStrength = (pwd) => {
  if (!pwd) return "";
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);

  if (hasLower && hasUpper && hasNumber) return "Strong";
  if (hasLower && hasUpper) return "Average";
  if (hasLower) return "Weak";
  return "Weak";
};
-->> Here i added upper, lowercase for the password setup in signup section by which user can make his/ her password strong and protect from the scams.

2. if (!users[username] || users[username].password !== passwordInput) {
  alert("Invalid credentials");
  return;
}

const code = Math.floor(1000 + Math.random() * 9000).toString();
setLoginCode(code);
setPendingUser(username);
setIsVerifying(true);
alert(`Verification code sent: ${code}`);
-->> Here i added some maths ideas and verification code system to validate the user, the user who is signing in that is same who signed up before by which site should be secure 100%.

3. const toggleDiscussionLike = (id, username) => {
  setDiscussions(
    discussions.map((d) =>
      d.id === id
        ? {
            ...d,
            likes: d.likes.includes(username)
              ? d.likes.filter((u) => u !== username)
              : [...d.likes, username],
            dislikes: d.dislikes.filter((u) => u !== username),
          }
        : d
    )
  );
};
-->> If i talk about this, here i added likes options.

4. const addPost = (discussionId, text, file = null) => {
  if (!text && !file) return;
  setDiscussions(
    discussions.map((d) =>
      d.id === discussionId
        ? {
            ...d,
            posts: [
              ...d.posts,
              {
                id: Date.now(),
                author: user,
                text,
                fileUrl: file ? URL.createObjectURL(file) : null,
                comments: [],
              },
            ],
          }
        : d
    )
  );
};
-->> Here,this addPost function is used to add a new post inside a specific discussion while keeping React state immutable. It first checks that the post isn’t empty (must have either text or a file), then updates the discussions state by mapping through all discussions and finding the one with the matching discussionId. For that discussion, it creates a new posts array by copying the existing posts and appending a new post object that includes a unique id, the logged-in author, the entered text, an optional fileUrl generated if a file was uploaded, and an empty comments array for future replies. This approach ensures React re-renders correctly, avoids mutating state directly, and supports both text-based and media posts.

--Its my short explanation of my codes, but rest of them pending codes you can see in the files where is located in frontend, backend and some other files. 



