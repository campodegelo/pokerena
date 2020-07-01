import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../Hooks/useStatefulFields";
import { useAuthSumbit } from "../Hooks/useAuthSubmit";

export default function Login() {
  const [values, handleChange] = useStatefulFields();
  const [error, loading, handleSubmit] = useAuthSumbit("/login", values);
  // const [loading, setLoading] = useState();

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

        <input type="hidden" name="_csrf" value="{{csrfToken}}"/>

        <button className="btn btn--white btn--animated" onClick={() => handleSubmit()}>login</button>
        {/* <Link to="/reset/start">
              Forgot your password? <br></br>Click here to reset it.
          </Link>
          <br></br> */}
        <Link to="/register" className="btn-text">Not registered yet? Sign up now</Link>
      </div>
  );
}
