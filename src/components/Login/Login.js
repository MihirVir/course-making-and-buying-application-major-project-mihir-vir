import React, { useReducer, useState } from 'react'

import { TextField, Button, Typography, Box,Grid, Divider, Stack, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { loginReducer, LOGIN_INITIAL_STATE } from '../../reducers/loginReducer'
import axios from 'axios'

const Login = () => {
    const [state, dispatch] = useReducer(loginReducer, LOGIN_INITIAL_STATE);
    const [error, setError] = useState(false)
    const handleChange = async (e) => {
        
        dispatch({
            type: "LOGIN_CHANGE_INPUT",
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
        
    }
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8000/auth/login";

        const loginData = {email: state.email, password: state.password};
        try {
            const response = await axios.post(url, loginData);
            console.log(response);
        } catch (err) {
            setError(true)
        }

    }
    
  return (
    <>
       <section className = "login">
        <div className="container">
            <form onSubmit={handleSubmit} >
                <Stack 
                    className = "stack"
                    divider = {<Divider orientation='vertical' flexItem/>}>
                        
                        <Paper className = "paper" variant = "outlined" elevation={0}>
                            <Typography className ="heading-card" variant = "h3">
                                Enter your details
                            </Typography>
                            <TextField onChange = {handleChange} name = "email" className = "input-field"  label = "email" variant='outlined'/>
                            <TextField onChange = {handleChange}  name = "password" className = "input-field" size = "Normal" label = "password" variant='outlined' type ="password" />
                            <Button className = "submit-btn" variant='outlined' size = "large">
                                Login
                            </Button>
                            <p className = "register" onClick = {() => navigate('/register')}>
                                { error ? "something went wrong" : "don't have an account? click here to sign up"}
                            </p>
                        </Paper>
                </Stack>
            </form>
        </div>
       </section>
    </>
  )
}

export default Login