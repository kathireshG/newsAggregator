import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        style={
          {
            // fontSize: "25px",
            // marginTop: "9px",
            // textAlign: "right",
            // position: "absolute",
            // right: "11%",
          }
        }
        className="logo"
      >
        News Aggregator
      </h1>
      <button
        style={{ justifyContent: "center", marginRight: "1000px" }}
        onClick={() => {
          window.location.href = "/interesting";
        }}
      >
        Interests
      </button>
      <h2
        style={{
          fontSize: "25px",
          textAlign: "right",
          position: "absolute",
          right: "11%",
        }}
      >
        Username: {window.localStorage.getItem("username")}
      </h2>
      <div>
        {/* <button
          onClick={() => {
            window.location.href = "/new";
          }}
        >
          Register New Vehicle
        </button> */}

        <button
          onClick={() => {
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("interests");
            window.location.href = "/login";
          }}
          className="logoutbutton"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
