import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const UserLogin = () => {
  useEffect(() => {
    if (window.localStorage.getItem("username") !== null) {
      window.location.href = "/";
    }
  }, []);
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      // console.log(username);
      // console.log(password);
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      const { success, user, message, interests } = response.data;
      if (success) {
        // Handle successful login internally
        console.log("Logged in successfully:", user);
        console.log(user);
        console.log(interests);
        notify("✅ Login Successfully");
        window.localStorage.setItem("username", user);
        window.localStorage.setItem("interests", interests);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setErrorMessage(message);
        // alert("Login Unsucessful");
      }
    } catch (error) {
      notify("❌ Login Unsuccessfully");
      console.error("Login error:", error);
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
              handleLogin();
            }}
          >
            <h1>Sign In</h1>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={handleLogin}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() => (window.location.href = "/register")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;

// return (
//   <div>
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
//     <div className="login-container">
//       <h2 className="bluff-page-h1">Login</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleLogin();
//         }}
//       >
//         <input
//           type="text"
//           className="login-input"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="login-input"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="login-button">
//           Login
//         </button>
//         <p>
//           Don't have an account? <a href="/register">Register</a>
//         </p>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//     </div>
//   </div>
// );
