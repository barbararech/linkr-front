import { useFormik } from "formik";
import styled from "styled-components";
import { basicSchema } from "../schemas";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function SignUpPage () {

  const onSubmit = (values, actions) => {

    // const body = {
    //   email: values.email,
    //   password: values.password, 
    //   username: values.username,
    //   pictureUrl: values.pictureUrl
    // };

    axios({
      method: "POST",
      url: "http://localhost:5000/signup",
      data: values
    })
      .then(response => {
        alert('Deu certo')
      })
      .catch(error => {
        alert('Não deu certo')

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
      username: "",
      pictureUrl: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });


  return (
    <Container>
    <div className="split" >
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
      {errors.email && touched.email && <p className="error">{errors.email}</p>}

      {/* <label htmlFor="password">Password</label> */}
      <input
        id="password"
        type="password"
        placeholder="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && touched.password ? "input-error" : ""}
      />
      {errors.password && touched.password && (
        <p className="error">{errors.password}</p>
      )}

      {/* <label htmlFor="name">Username</label> */}
      <input
        id="username"
        type="text"
        placeholder="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.username && touched.username ? "input-error" : ""}
      />
      {errors.username && touched.username && <p className="error">{errors.username}</p>}

      {/* <label htmlFor="name">Picture Url</label> */}
      <input
        id="pictureUrl"
        type="text"
        placeholder="picture url"
        value={values.pictureUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.pictureUrl && touched.pictureUrl ? "input-error" : ""}
      />
      {errors.pictureUrl && touched.pictureUrl && <p className="error">{errors.pictureUrl}</p>}
      
      <button type="submit">
      
        Sign Up
      </button>
      <h6>Switch back to log in</h6>
    </form>
    </div>
    </div>
    </Container>
  );

}

export default SignUpPage;


// Style

const Container = styled.div`

.split {
  display: flex;
  flex-direction: row;
}

.form {
  //padding-top: 15vh;
  background-color: #333333;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
}

.logo {
  color: #FFFFFF;
  background-color: #151515;
  width: 60vw;
  height: 100vh;

  h1{
    padding: 20vh 0px 0em 10vw;
  }

  h3{
    padding: 0em 0px 0em 10vw;
  }
}

.error {
  color: #fc8181;
  font-size: 0.75rem;
  text-align: left;
  margin-top: 0.20rem;
  margin-bottom: -0.20rem;
}

form {
  //max-width: 400px;
  margin: 0 2vw 0 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  h6 {
    margin-top: 5px;
    text-decoration: underline;
    color: #FFFFFF;
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
  background-color: #FFFFFF;
  border-radius: 8px;
  outline: none;
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
  background-color: #1877F2;
  color: #FFFFFF;
  border: none;
  border-radius: 3px;
  width: 85%;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

input.input-error,
select.input-error {
  margin: 15px 0 5px 0;
  border-color: #fc8181;
 background-color: #49312B 
}

button:disabled {
  opacity: 0.35;
}

`;