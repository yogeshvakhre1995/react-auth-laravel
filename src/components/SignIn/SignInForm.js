import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";

const SignInForm = (props) => {
  const [redirect, setRedirect] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("http://192.168.0.92:8000/api/user-login", data)
      .then((response) => {
        setIsLoading(false);
        if (response.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));

          setErrMsg(response.data.message);
          setIsLoggedIn(true);
          setRedirect(true);
          setTimeout(() => {
            setErrMsg(" ");
          }, 3000);
        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          /* this.setState({
              errMsgEmail: response.data.validation_error.email,
              errMsgPwd: response.data.validation_error.password,
            });
            setTimeout(() => {
              this.setState({ errMsgEmail: "", errMsgPwd: "" });
            }, 2000);*/

          setFormErrors(response.data.validation_error);
          console.log(response.data.validation_error);
          setTimeout(() => {
            setFormErrors(" ");
          }, 3000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          //  console.log(response.data.message);
          setErrMsg(response.data.message);

          setTimeout(() => {
            setErrMsg(" ");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  const login = localStorage.getItem("isLoggedIn");
  if (login) {
    return <Navigate to="/home" />;
  }
  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegistration, handleError)}
      className="containers"
    >
      {formErrors}
      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Enter email"
          {...register("email", registerOptions.email)}
        />
        <small className="text-danger">
          {/* server side validation  */}
          {formErrors?.email && formErrors.email}
          {/* client side validation  */}
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter password"
          {...register("password", registerOptions.password)}
        />
        <small className="text-danger">
          {/* server side validation  */}
          {formErrors?.password && formErrors.password}
          {/* client side validation  */}
          {errors?.password && errors.password.message}
        </small>
      </div>
      <p className="text-danger">{errMsg.length > 0 ? errMsg : ""}</p>

      <button className="text-center mb-4 btn btn-success">
        Sign In
        {isLoading ? (
          <span
            className="spinner-border spinner-border-sm ml-5"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <span></span>
        )}
      </button>
      <Link to="/" className="text-white ml-5">
        Create account here
      </Link>
    </form>
  );
};

export default SignInForm;
