import { useRef, useEffect } from "react";
import "./App.css";
import "./style.css";
import UserLogin from "./UserLogin";
import Navbar from "./Navbar";
import Home from "./Home";
import RegistrationPage from "./RegistrationPage";
import InterestNews from "./InterestNews";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const isUserLoggedIn = () => {
  return !!window.localStorage.getItem("username");
};

const routerDefinition = createRoutesFromElements(
  <Route>
    <Route
      path="/"
      element={
        isUserLoggedIn() ? (
          <div>
            <Navbar />

            <div className="app">
              <div>
                <Home />
              </div>
            </div>
          </div>
        ) : (
          <UserLogin />
        )
      }
    />
    <Route path="/login" element={<UserLogin />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route
      path="/interesting"
      element={
        <div>
          <Navbar />

          <div className="app">
            <div>
              <InterestNews />
            </div>
          </div>
        </div>
      }
    />
  </Route>
);

const router = createBrowserRouter(routerDefinition);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
