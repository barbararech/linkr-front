import { useFormik } from "formik";
import styled from "styled-components";
import { basicSchema } from "../schemas";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignInPage() {
  const onSubmit = (values, actions) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    axios({
      method: "POST",
      url: "http://localhost:4000/signup",
      data: values,
    })
      .then((response) => {
        alert("Deu certo");
      })
      .catch((error) => {
        alert("Não deu certo");
      });
  };

  // ALERTS TEMPORÁRIOS !!!

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <Container>
      <div className="split">
        <div className="logo">
          <h1>linkr</h1>
          <h3>save, share and discover</h3>
          <h3>the best links on the web</h3>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* <label htmlFor="email">Email</label> */}
            <input
              value={values.email}
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="e-mail"
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}

            {/* <label htmlFor="password">Password</label> */}
            <input
              id="password"
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}

            <button type="submit">Log In</button>
            <Link to="/signup">
              <h6>First time? Create an account!</h6>
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default SignInPage;

// Style

const Container = styled.div`
  .split {
    display: flex;
    flex-direction: row;
  }

  .form {
    padding-top: 30%;
    background-color: #333333;
    width: 40vw;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    //align-items: center;
  }

  .logo {
    color: #ffffff;
    background-color: #151515;
    width: 60vw;
    height: 100vh;
    padding-top: 25%;

    h1 {
      padding: 0 0 0 10vw;
      font-size: 106px;
      font-weight: 700;
      font-family: "Passion One";
    }

    h3 {
      font-size: 43px;
      padding: 0em 0px 0em 10vw;
      font-family: "Oswald";
    }
  }

  .error {
    color: #fc8181;
    font-size: 0.75rem;
    text-align: left;
    margin-top: 0.2rem;
    margin-bottom: -0.2rem;
  }

  form {
    //max-width: 400px;
    margin: 0 2vw 0 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    h6 {
      margin-top: 22px;
      text-decoration: underline;
      color: #ffffff;
      font-family:'Lato';
    }
  }

  input,
  select {
    width: 80%;
    padding: 0.65rem 0.5rem;
    margin-top: 4px;
    font-size: 1rem;
    color: black;
    border: 2px solid #4a5568;
    background-color: #ffffff;
    border-radius: 8px;
    outline: none;
    font-family: "Oswald";
  }

  input:focus,
  select:focus {
    border-color: #4299e1;
  }

  input::placeholder,
  select::placeholder {
    color: #a0aec0;
  }

  button {
    display: block;
    margin: 0.5rem 0;
    padding: 0.6rem 0.5rem;
    background-color: #1877f2;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    width: 85%;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Oswald";
  }

  input.input-error,
  select.input-error {
    margin: 15px 0 5px 0;
    border-color: #fc8181;
    background-color: #49312b;
  }

  button:disabled {
    opacity: 0.35;
  }
`;
