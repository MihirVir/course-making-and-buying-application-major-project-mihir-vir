import { useNavigate } from "react-router-dom";
import React, { useReducer, useState } from "react";
import axios from "axios";
import { URL } from "../../URL";
import "./register.css";
import { INITIAL_STATE, registerReducer } from "../../reducers/registerReducer";
const Register = () => {
  const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${URL}auth/register`;
    const post = {
      email: state.email,
      username: state.username,
      password: state.password,
    };
    try {
      const response = await axios.post(url, post);
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(state.username, state.email, state.password);
  return (
    <>
      <section className="login-section">
        <div className="login-container bg-neutral-900">
          <form onSubmit={handleSubmit} className="login-form-style">
            <h2 className="form-heading text-white">Login</h2>
            <input
              type="text"
              className="input-field-login"
              onChange={handleChange}
              name="email"
              placeholder="email"
            />
            <input
              type="text"
              name="username"
              className="input-field-login"
              placeholder="username"
              onChange={handleChange}
            />
            <input
              className="input-field-login"
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="password"
            />

            <button type="submit" className="submit-btn ">
              Register
            </button>

            <p
              onClick={() => {
                navigate("/register");
              }}
              className="text-white"
              style={{
                cursor: "pointer",
              }}
            >
              Don't have an account? click to register (working on CSS Tho won't
              be styled) the logic works
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
