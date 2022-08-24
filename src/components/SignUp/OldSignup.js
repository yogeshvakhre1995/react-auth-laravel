import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./signup.css";
//import { Link } from "react-router-dom";
import SingnUpForm from "./SingnUpForm";
export default class Signupold extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        isLoading: "",
      },
      msg: "",
      errors: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
    };
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://192.168.0.92:8000/api/user-signup", this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              name: "",
              email: "",
              phone: "",
              password: "",
            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }

        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {

          this.setState({          
            errors: {
              name: response.data.errors.name,
              email: response.data.errors.email,             
              password: response.data.errors.password,
            }
          });
          setTimeout(() => {
            this.setState({ 
              errors: {
                name: "",
                email: "",               
                password: "",
              }
            });
          }, 3000);
        }
        //console.log(response);
        if (response.data.message === "validation_error") {
          this.setState({ msg: response.data.message });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  };
  render() {
   const {errors} = this.state;
   const isLoading = this.state.isLoading;
    
    return (
      <div>
        
        <Form className="containers shadow">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              placeholder="Enter name"
              value={this.state.signupData.name}
              onChange={this.onChangehandler}            
            />
             {errors.name.length > 0 && 
                <span className='text-danger'>{errors.name}</span>}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email id</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
            />
            {errors.email.length > 0 && 
                <span className='text-danger'>{errors.email}</span>}
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="phone"
              name="phone"
              placeholder="Enter phone number"
              value={this.state.signupData.phone}
              onChange={this.onChangehandler}
            />
            
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.signupData.password}
              onChange={this.onChangehandler}
            />
            {errors.password.length > 0 && 
                <span className='text-danger'>{errors.password}</span>}
          </FormGroup>
          <p className="text-white">{this.state.msg}</p>
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSubmitHandler}
          >
            Sign Up
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <span></span>
            )}
          </Button>
          <Link to="/sign-in" className="text-white ml-5">I'm already member</Link>
        </Form>
      </div>
    );
  }
}