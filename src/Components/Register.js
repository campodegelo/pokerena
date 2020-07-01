import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../Hooks/useStatefulFields";
import { useAuthSumbit } from "../Hooks/useAuthSubmit";
// import axios from "../scripts/axios";

export default function Register () {
  const [values, handleChange] = useStatefulFields();
  const [error, loading, handleSubmit] = useAuthSumbit("/register", values);
  console.log(values);

  // useEffect (() => {
  //   (async () => {
  //     const data = await axios.get("/user");
  //     console.log("logged user : ", data.data);
  //     if (data.data.success !== false) {
  //       this.setState({ loggedUser: data });
  //     }
  //   })();
  // }, []);

  return (
      <div className="form">
          {error && (
            <div className="form__error">Ops! An error happened. Try again!</div>
          )}
          {loading && (
          <div className="loading">
            <img src="/img/spadesgif.gif" alt="chip gif poker" className="loading__image"></img>
          </div>
         )}
        <div className="form__group">
          <input
            type="text"
            name="first"
            placeholder="First Name"
            className="form__input"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
          <label htmlFor="first" className="form__label">First Name</label>
        /</div>

        <div className="form__group">
          <input
            type="text"
            name="last"
            placeholder="Last Name"
            className="form__input"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
          <label htmlFor="last" className="form__label">Last Name</label>
        </div>

        <div className="form__group">
          <input
            type="email"
            name="email"
            placeholder="email address"
            className="form__input"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
          <label htmlFor="email" className="form__label">Email Address</label>

        </div>

        <div className="form__group">
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form__input"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
          <label htmlFor="password" className="form__label">Password</label>

        </div>

        <div className="form__group">
          <input
            type="password"
            name="confirm"
            placeholder="confirm pwd"
            className="form__input"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />

          <label htmlFor="confirm" className="form__label">Confirm your Password</label>

        </div>
          <input type="hidden" name="_csrf" value="{{csrfToken}}"/>

          
          <button className="btn btn--white btn--animated" onClick={() => handleSubmit()}>register</button>
          <Link to="/login" className="btn-text">
            Already signed up?<br></br> Click here to Log In
          </Link>
      </div>
  );
}
