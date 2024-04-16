import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Home.css";

const Home = () => {
  // State variables to manage user input and login/registration status
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Function to handle login
  const handleLogin = (values) => {
    // Check if username and password are not empty
    if (values.username.trim() !== "" && values.password.trim() !== "") {
      // Set loggedIn state to true if username and password are not empty
      setLoggedIn(true);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Set loggedIn state to false
    setLoggedIn(false);
    // Clear login credentials
    setLoginCredentials({ username: "", password: "" });
  };

  // Function to handle registration form submission
  const handleRegistration = (values) => {
    console.log("Registration form submitted with values:", values);
    // Perform registration logic here (e.g., API call)
    // For demonstration purposes, we'll assume success
    setRegistered(true);
  };

  return (
    <div>
      {/* Registration form */}
      {!registered && (
        <>
          <h2>Registration</h2>
          <Formik
            initialValues={{
              firstName: "",
              surname: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = "Required";
              }
              if (!values.surname) {
                errors.surname = "Required";
              }
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Password must be at least 8 characters";
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords must match";
              }
              return errors;
            }}
            onSubmit={(values) => {
              handleRegistration(values);
              setRegistered(true);
            }}
          >
            <Form>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field type="text" id="firstName" name="firstName" />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <label htmlFor="surname">Surname</label>
                <Field type="text" id="surname" name="surname" />
                <ErrorMessage name="surname" component="div" />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <button type="submit">Register</button>
            </Form>
          </Formik>
        </>
      )}

      {/* Conditional rendering based on loggedIn state */}
      {loggedIn ? (
        // If logged in, display welcome message and logout button
        <div>
          <h1>Welcome {loginCredentials.username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        // If not logged in, display login form
        <div>
          <h2>Login</h2>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "Username is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
            onSubmit={(values) => {
              setLoginCredentials(values);
              handleLogin(values);
            }}
          >
            <Form>
              <div>
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit">Login</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Home;
