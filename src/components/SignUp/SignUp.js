import React, { Component } from "react";
import "./signup.css";
import SingnUpForm from "./SingnUpForm";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  render() {
    return (
      <div>
        <SingnUpForm />
      </div>
    );
  }
}
