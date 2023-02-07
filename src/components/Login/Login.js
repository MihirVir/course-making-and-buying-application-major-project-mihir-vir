import {useState, useReducer} from 'react'
import { TextField, Alert } from '@mui/material';

import { useNavigate } from 'react-router-dom'
import { registerReducer, INITIAL_STATE } from '../../reducers/registerReducer';

import axios from 'axios';
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
    const [error, setError] = useState(false)
    
    function saveAccessToken(token) {
        document.cookie = `access_token=${token}; path=/;`;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUrl = 'http://localhost:8000/auth/login';
        const userDetails = {
            email: state.email,
            password: state.password
        }

        const res = await axios.post(loginUrl, userDetails)
            
            .catch((err) => setError(true));
        if(res.status === 200) {
            saveAccessToken(res.data.token);
            navigate('/');
        }
    }

    
    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }
  return (
    <>
        <section className = "login-section">
            {
                error ? (
                    <>
                        <Alert severity='error'>
                            User Not Found Please Check Your Email and Password
                        </Alert>
                    </>
                ) : ""
            }
            <div className="login-container">
                <form onSubmit={handleSubmit} className = "login-form-style">
                    <h2 className = "form-heading">
                        Login Account
                    </h2>
                    <TextField
                        onChange={handleChange}
                        variant='outlined' 
                        name = "email"
                        label = "Email"     
                        className = "text-view"
                    />
                    <TextField
                        onChange={handleChange}
                        variant='outlined' 
                        name = "password"
                        label = "Password"     
                        type = "password"
                        className = "text-view"
                    />

                    <button className = "submit-btn">
                        Login
                    </button>

                    <p onClick = {() => {navigate('/')}}>
                        Don't have an account? click to register
                    </p>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login