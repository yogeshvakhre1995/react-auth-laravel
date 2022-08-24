import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";

function SingnUpForm(props) {
  const login = localStorage.getItem("isLoggedIn");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Singn Up Form load event ,varible

  // Singn Up Form submition error
  const handleError = (errors) => {
    console.log(errors);
  };

  // Singn Up Form submition
  const handleRegistration = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("http://192.168.0.92:8000/api/user-signup", data)
      .then((response) => {
        setIsLoading(false);
        if (response.data.status === 200) {
          //localStorage.setItem("isLoggedIn", true);
          //localStorage.setItem("userData", JSON.stringify(response.data.data));

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

  // Singn Up Form Validation option
  const registerOptions = {
    name: { required: "Name is required" },
    email: { email: true, required: "Email is required" },
    phone: { required: "Phone number is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  // if (login) {
  //      return <Navigate to="/sing-in" />;
  // }
  if (redirect) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegistration, handleError)}
      className="containers shadow"
    >
      <div className="mb-3">
        <label>Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Enter name"
          {...register("name", registerOptions.name)}
        />
        <small className="text-danger">
          {/* server side validation  */}
          {formErrors?.name && formErrors.name}
          {/* client side validation  */}
          {errors?.name && errors.name.message}
        </small>
      </div>
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
        <label>Phone Number</label>
        <input
          className="form-control"
          type="text"
          name="phone"
          placeholder="Enter phone number"
          {...register("phone", registerOptions.phone)}
        />
        <small className="text-danger">
          {/* server side validation  */}
          {formErrors?.phone && formErrors.phone}
          {/* client side validation  */}
          {errors?.phone && errors.phone.message}
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
      </button>
      <Link to="/sign-in" className="text-white ml-5">
        I'm already member
      </Link>
    </form>
  );
}

export default SingnUpForm;
