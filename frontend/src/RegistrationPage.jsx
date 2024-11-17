import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, SetInterests] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const notify = (text) => {
    toast(`${text}`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      console.log({
        username,
        password,
        interests,
      });
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
        interests,
      });
      console.log(response.data);
      const { success, user, message } = response.data;
      console.log(user);
      if (success) {
        console.log("Registered successfully:", user);
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("interests", interests);
        notify("✅ Registration Successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      notify("❌ Registration Error");
    }
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <h1>Register</h1>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="text"
              className="login-input"
              placeholder="Interests (Give Comma separated)"
              value={interests}
              onChange={(e) => SetInterests(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Already have an Account?</p>
              <button
                className="hidden"
                id="register"
                onClick={() => (window.location.href = "/")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

// return (
//   <div className="register-container">
//     <ToastContainer
//       position="bottom-center"
//       autoClose={100}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="dark"
//     />
//     <h2 className="bluff-page-h1">Register</h2>
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleRegister();
//       }}
//     >
//       <input
//         type="text"
//         className="register-input"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         className="register-input"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         className="register-input"
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         className="register-input"
//         placeholder="Interests (Give Comma seperated)"
//         value={interests}
//         onChange={(e) => SetInterests(e.target.value)}
//         required
//       />
//       <button type="submit" className="register-button">
//         Register
//       </button>
//     </form>
//     {errorMessage && <p className="error-message">{errorMessage}</p>}
//     <p>
//       Already have an account? <a href="/">Login</a>
//     </p>
//   </div>
// );
