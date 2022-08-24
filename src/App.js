// App.js file
import React, { Component } from "react";
import "./App.css";
import Signup from "./components/SignUp/SignUp";
import Signin from "./components/SignIn/SignIn";
//import SignInForm from "./components/SignIn/SignInForm";
import Home from "./components/Home/Home";
import UserDataTable from "./components/users/UserDataTable";
import LayoutApp from "./components/Layout/App";
//import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default class App extends Component {
  render() {
    // let navLink = (
    //   <div className="Tab">
    //     <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
    //       Sign In
    //     </NavLink>
    //     <NavLink exact to="/" activeClassName="activeLink" className="signUp">
    //       Sign Up
    //     </NavLink>
    //   </div>
    // );
    const login = localStorage.getItem("isLoggedIn");

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            {login ? (
              <Route path="/" element={<LayoutApp />}>
                <Route index element={<Signup />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/landing" element={<Signin />} />
                <Route path="/home" element={<Home />} />
              </Route>
            ) : (
              <Route>
                <Route path="/" element={<Signup />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/landing" element={<Signin />} />
                <Route path="/user/index" element={<UserDataTable />} />
                <Route path="/home" element={<Home />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>

        {/*login ? (
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        ) : (
          <Router>
            {navLink}
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        )*/}
      </div>
    );
  }
}
