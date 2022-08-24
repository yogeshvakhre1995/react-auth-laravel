import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import SignInForm from "./SignInForm";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="/home" />;
    }

    return (
      <div>
        <SignInForm />
      </div>
    );
  }
}
