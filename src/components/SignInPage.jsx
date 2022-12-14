import { useFormik } from "formik";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas";
import {
  useUserData,
  saveUserDataInLocalStorage,
} from "../contexts/userContext.jsx";
import API from "./shared/constants";

function SignInPage() {
  const [enable, setEnable] = useState(true);
  const [, setUserData] = useUserData();
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    setEnable(false);

    axios({
      method: "POST",
      url: `${API}/signin`,
      data: values,
    })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        saveUserDataInLocalStorage(response.data);
        navigate("/timeline");
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          alert("Email ou senha inválidos!");
        } else {
          alert(error);
        }

        setEnable(true);
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
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <Container enable={enable}>
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
    padding-top: 300px;
    background-color: #333333;
    width: 40vw;
    display: flex;
    flex-direction: column;
  }

  .logo {
    color: #ffffff;
    background-color: #151515;
    width: 60vw;
    height: 100vh;
    padding-top: 300px;

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
    margin-bottom: 0.6rem;
  }

  form {
    margin: 0 2vw 0 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    h6 {
      margin-top: 22px;
      text-decoration: underline;
      color: #ffffff;
      font-family: "Lato";
      font-size: 20px;
    }
  }

  input,
  select {
    width: 85%;
    padding: 0.65rem 0.5rem;
    margin-bottom: 13px;
    font-size: 27px;
    color: black;
    border: 2px solid #4a5568;
    background-color: #ffffff;
    border-radius: 6px;
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
    padding: 0.6rem 0.5rem;
    background-color: #1877f2;
    color: #ffffff;
    margin-top: 12px;
    border: none;
    border-radius: 6px;
    width: 85%;
    font-size: 27px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Oswald";
    opacity: ${(props) => (props.enable ? "1" : "0.7")};
    pointer-events: ${(props) => (props.enable ? "auto" : "none")};
  }

  input.input-error,
  select.input-error {
    margin: 15px 0 15px 0;
    border-color: #fc8181;
    background-color: #49312b;
  }

  button:disabled {
    opacity: 0.35;
  }

  @media (max-width: 935px) {
    .split {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .form {
      padding-top: 40px;
      width: 100%;
      height: 100vh;
    }

    .logo {
      width: 100%;
      height: 175px;
      text-align: center;
      padding-top: 10px;

      h1 {
        padding: 0 0 0 0vw;
        font-size: 76px;
        font-weight: 700;
        line-height: 83px;
      }

      h3 {
        font-size: 23px;
        line-height: 34px;
        padding: 0em 0px 0em 0vw;
      }
    }

    form {
      width: 100%;

      h6 {
        font-size: 17px;
      }
    }

    input,
    select {
      font-size: 22px;
    }

    button {
      font-size: 22px;
    }
  }
`;
