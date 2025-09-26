import React, { useState, useEffect } from "react";
import DiscussionForm from "./DiscussionForm";
import DiscussionList from "./DiscussionList";
import PostForm from "./PostForm";
import PostList from "./PostList";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import bgImage from "./images/background.jpg"; // lock background
import discussionBg from "./images/discussion-bg.jpg"; // discussion board
import heroImage from "./images/hero.jpg"; // meeting picture

function App() {
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [forgotStep, setForgotStep] = useState(1);

  // Login Verification
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [enteredLoginCode, setEnteredLoginCode] = useState("");
  const [pendingUser, setPendingUser] = useState(null);

  // Load saved
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedDiscussions = localStorage.getItem("discussions");
    if (savedUser) setUser(savedUser);
    if (savedDiscussions) setDiscussions(JSON.parse(savedDiscussions));
  }, []);

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  // Password Strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return "";
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);

    if (hasLower && hasUpper && hasNumber) return "Strong";
    if (hasLower && hasUpper) return "Average";
    if (hasLower) return "Weak";
    return "Weak";
  };

  const passwordStrength = getPasswordStrength(passwordInput);

  // Auth Logic
  const handleLoginSignup = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const username = usernameInput.trim();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    let newErrors = {};

    if (isSignup) {
      if (!username) newErrors.username = "Username is required";
      if (!passwordInput) newErrors.password = "Password is required";
      if (!emailInput) newErrors.email = "Email is required";
      if (!phoneInput) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(phoneInput)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (users[username]) newErrors.username = "Username already exists";
      if (passwordStrength !== "Strong") {
        newErrors.password = "Password must be Strong to sign up!";
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      users[username] = {
        password: passwordInput,
        email: emailInput,
        phone: phoneInput,
      };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful, login now!");
      setIsSignup(false);
      setUsernameInput("");
      setPasswordInput("");
      setEmailInput("");
      setPhoneInput("");
      setErrors({});
      return;
    }

    if (!username) newErrors.username = "Username is required";
    if (!passwordInput) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!users[username] || users[username].password !== passwordInput) {
      alert("Invalid credentials");
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setLoginCode(code);
    setPendingUser(username);
    setIsVerifying(true);
    alert(`Verification code sent: ${code}`);

    setUsernameInput("");
    setPasswordInput("");
    setErrors({});
  };

  const handleVerifyLoginCode = () => {
    if (enteredLoginCode !== loginCode) {
      alert("Invalid verification code!");
      return;
    }
    setUser(pendingUser);
    localStorage.setItem("user", pendingUser);
    setIsVerifying(false);
    setLoginCode("");
    setEnteredLoginCode("");
    setPendingUser(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("You have been logged out!");
  };

  // Forgot Password
  const handleForgotPasswordStep = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (forgotStep === 1) {
      if (!resetUsername || !users[resetUsername]) {
        alert("User not found!");
        return;
      }
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
      alert(`Verification code sent: ${code}`);
      setForgotStep(2);
      return;
    }
    if (forgotStep === 2) {
      if (forgotCode !== generatedCode) {
        alert("Invalid code");
        return;
      }
      setForgotStep(3);
      return;
    }
    if (forgotStep === 3) {
      if (!resetPassword) {
        alert("Enter new password");
        return;
      }
      users[resetUsername].password = resetPassword;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password reset successful! Login again.");
      setIsForgotPassword(false);
      setResetUsername("");
      setResetPassword("");
      setForgotCode("");
      setGeneratedCode("");
      setForgotStep(1);
    }
  };

  // Discussion
  const addDiscussion = (title) => {
    if (!title) return;
    const newDiscussion = {
      id: Date.now(),
      title,
      createdBy: user,
      likes: [],
      dislikes: [],
      posts: [],
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  const deleteDiscussion = (id) => {
    setDiscussions(discussions.filter((d) => d.id !== id));
    setSelectedDiscussion(null);
  };

  const toggleDiscussionLike = (id, username) => {
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

  const toggleDiscussionDislike = (id, username) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === id
          ? {
              ...d,
              dislikes: d.dislikes.includes(username)
                ? d.dislikes.filter((u) => u !== username)
                : [...d.dislikes, username],
              likes: d.likes.filter((u) => u !== username),
            }
          : d
      )
    );
  };

  const addPost = (discussionId, text, file = null) => {
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

  const deletePost = (discussionId, postId) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? { ...d, posts: d.posts.filter((p) => p.id !== postId) }
          : d
      )
    );
  };

  const addComment = (discussionId, postId, text) => {
    if (!text) return;
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              posts: d.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      comments: [
                        ...p.comments,
                        { id: Date.now(), author: user, text },
                      ],
                    }
                  : p
              ),
            }
          : d
      )
    );
  };

  // Verification Screen
  if (isVerifying) {
    return (
      <div
        className="auth-bg d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-3">Enter Verification Code</h3>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter code"
            value={enteredLoginCode}
            onChange={(e) => setEnteredLoginCode(e.target.value)}
          />
          <button className="btn btn-success w-100 mb-2" onClick={handleVerifyLoginCode}>
            <i className="bi bi-shield-lock-fill me-2"></i> Verify
          </button>
          <button
            className="btn w-100"
            style={{ background: "royalblue", color: "white" }}
            onClick={() => {
              const newCode = Math.floor(1000 + Math.random() * 9000).toString();
              setLoginCode(newCode);
              alert(`New verification code sent: ${newCode}`);
            }}
          >
            <i className="bi bi-arrow-repeat me-2"></i> Resend Code
          </button>
        </div>
      </div>
    );
  }

  // Forgot Password Screen
  if (isForgotPassword) {
    return (
      <div
        className="auth-bg d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-3">Forgot Password</h3>
          {forgotStep === 1 && (
            <>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter your username"
                value={resetUsername}
                onChange={(e) => setResetUsername(e.target.value)}
              />
              <button className="btn btn-primary w-100" onClick={handleForgotPasswordStep}>
                Send Code
              </button>
            </>
          )}
          {forgotStep === 2 && (
            <>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter verification code"
                value={forgotCode}
                onChange={(e) => setForgotCode(e.target.value)}
              />
              <button className="btn btn-success w-100" onClick={handleForgotPasswordStep}>
                Verify Code
              </button>
            </>
          )}
          {forgotStep === 3 && (
            <>
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Enter new password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
              />
              <button className="btn btn-success w-100" onClick={handleForgotPasswordStep}>
                Reset Password
              </button>
            </>
          )}
          <button className="btn btn-secondary w-100 mt-2" onClick={() => setIsForgotPassword(false)}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Auth Screen
  if (!user) {
    return (
      <div
        className="auth-bg d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-1 d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-person-circle fs-1 text-primary"></i>
            {isSignup ? "Join Us" : "Welcome Back"}
          </h2>
          <h5 className="text-center text-muted mb-3">{isSignup ? "Sign Up" : "Sign In"}</h5>
          <form onSubmit={handleLoginSignup}>
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            {errors.username && <div className="text-danger small">{errors.username}</div>}
            <input
              type="password"
              className="form-control mb-1"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
            {isSignup && (
              <>
                <div className="mb-1">
                  <small
                    className={`${
                      passwordStrength === "Strong"
                        ? "text-success"
                        : passwordStrength === "Average"
                        ? "text-warning"
                        : "text-danger"
                    }`}
                  >
                    {passwordStrength && `Password strength: ${passwordStrength}`}
                  </small>
                </div>
                <input
                  type="email"
                  className="form-control mb-1"
                  placeholder="Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                {errors.email && <div className="text-danger small">{errors.email}</div>}
                <input
                  type="tel"
                  className="form-control mb-1"
                  placeholder="Phone"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                />
                {errors.phone && <div className="text-danger small">{errors.phone}</div>}
              </>
            )}
            <button className="btn btn-primary w-100 mb-2">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="text-center">
            <span
              onClick={() => setIsSignup(!isSignup)}
              style={{ cursor: "pointer", color: "#0d6efd", textDecoration: "underline" }}
            >
              {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
            </span>
            <br />
            <span
              onClick={() => setIsForgotPassword(true)}
              style={{ cursor: "pointer", color: "red", textDecoration: "underline" }}
            >
              Forgot Password?
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Main Screen
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand fw-bold text-white" href="#hero">
          Jashan
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex gap-4">
            <li className="nav-item">
              <a className="nav-link" href="#hero">Hero</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#three">Three-Column</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#discussion">Discussion</a>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary me-2"
                onClick={() => alert("© 2025 Jashan - All rights reserved")}
              >
                Copyright
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="hero-section d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh",
        }}
      >
        <div>
          <h1 className="fw-bold display-4">Welcome to My App</h1>
          <p className="lead">Professional place for collaboration and discussions.</p>
        </div>
      </section>

      {/* Three-Column Section */}
      <section id="three" className="py-5 text-center">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <img src="/images/column1.jpg" alt="column1" className="img-fluid rounded mb-3" />
              <h4>Sunrise</h4>
              <p>
                Like the sunrise breaking over the mountains, everything here moves quickly 
                and smoothly, giving you a refreshing start and keeping your journey effortless. 
              </p>
            </div>
            <div className="col-md-4">
              <img src="/images/column2.jpg" alt="column2" className="img-fluid rounded mb-3" />
              <h4>Forests</h4>
              <p>
                Just as strong forests stand tall against the winds, your space here is 
                protected and reliable. You can feel safe and grounded, no matter the storm. 
              </p>
            </div>
            <div className="col-md-4">
              <img src="/images/column3.jpg" alt="column3" className="img-fluid rounded mb-3" />
              <h4>River</h4>
              <p>
                Like rivers joining together into the ocean, ideas and voices flow here 
                in harmony. It’s a place where everyone’s contribution becomes part of a bigger picture. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion Board */}
      <section
        id="discussion"
        className="main-bg container-fluid py-5"
        style={{
          backgroundImage: `url(${discussionBg})`,
          backgroundSize: "cover",
          minHeight: "120vh",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
          <div className="discussion-header text-center mb-4">
            <h2 className="discussion-title">Discussion Board</h2>
          </div>
          {!selectedDiscussion ? (
            <>
              <DiscussionForm addDiscussion={addDiscussion} />
              <DiscussionList
                discussions={discussions || []}
                selectDiscussion={setSelectedDiscussion}
                deleteDiscussion={deleteDiscussion}
                currentUser={user}
                toggleLike={toggleDiscussionLike}
                toggleDislike={toggleDiscussionDislike}
              />
            </>
          ) : (
            <div className="card p-3 shadow-sm mx-auto" style={{ maxWidth: "1000px" }}>
              <h2>{selectedDiscussion.title}</h2>
              <button
                className="btn btn-secondary btn-sm mb-3"
                onClick={() => setSelectedDiscussion(null)}
              >
                Back
              </button>
              <PostList
                posts={selectedDiscussion.posts || []}
                deletePost={(postId) => deletePost(selectedDiscussion.id, postId)}
                currentUser={user}
                addComment={(postId, text) => addComment(selectedDiscussion.id, postId, text)}
              />
              {/* Only creator can add post */}
              {user === selectedDiscussion.createdBy && (
                <PostForm addPost={(text, file) => addPost(selectedDiscussion.id, text, file)} />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        © 2025 Jashan - All rights reserved
      </footer>
    </>
  );
}

export default App;
