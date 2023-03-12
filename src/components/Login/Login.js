import {useState, useReducer, useEffect} from 'react'
import { TextField, Alert } from '@mui/material';

import { useNavigate } from 'react-router-dom'
import { registerReducer, INITIAL_STATE } from '../../reducers/registerReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './login.css'
import SetCookie from '../../hooks/setCookie';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUrl = 'https://backend-course-app-production-1670.up.railway.app/auth/login';
        setLoading(true);
        const userDetails = {
            email: state.email,
            password: state.password
        }
        const res = await axios.post(loginUrl, userDetails, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        })
        if (res.status !== 200 || res.status !== 201) {
            setError(true);
        }
        toast.success("successfully logged in ", {
            position: toast.POSITION.TOP_RIGHT
        })
        setUser(res.data.token);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        if(res.status === 200) {
            // saveAccessToken(res.data.token);
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

    useEffect(() => {
        if (error) {
            toast.error("Error: User not found or Please Check Your Email and Password")
        }
    }, [success, error])
  return (
    <>
        <section className = "login-section">
            {
                error && (
                    <>
                        <Alert severity='error'>
                            User Not Found Please Check Your Email and Password
                        </Alert>
                    </>
                )
            }
            <div className="login-container">
            <ToastContainer />
                <form onSubmit={handleSubmit} className = "login-form-style">
                    <h2 className = "form-heading">
                        Login
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

                    <button type = "submit" className = "submit-btn">
                        {loading ? "Loading..." :  "Login"}
                    </button>

                    <p onClick = {() => {navigate('/register')}}>
                        Don't have an account? click to register
                    </p>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login