"use strict";

import React from "react";
import { render } from "react-dom";
import { Outlet, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    return (
      <>
        <nav>
          <ul type="none">
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/sign-in">Signin</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/landing">Landing Page </Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </>
    );
  }
}

export default App;
