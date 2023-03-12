import { Button, Paper, TextField,Divider, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useNavigate  } from 'react-router-dom'
import React, { useReducer, useState } from 'react'
import axios from 'axios'
import './register.css'
import { INITIAL_STATE, registerReducer } from '../../reducers/registerReducer'
const Register = () => {
    const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "https://backend-course-app-production.up.railway.app/auth/register"
        const post = { email: state.email, username: state.username, password: state.password}
        try {
            const response = await axios.post(url, post)
            console.log(response.data);
            navigate('/');
        } catch (err) { 
           console.log(err); 
        }   
    }
    // console.log(state.username, state.email, state.password);
  return (
    <>
        <section className="register-page">
            <div className="register-page-container">
                <Paper className = "register-page-container-paper" elevation={2}>
                    <form onSubmit={handleSubmit} className = "form">
                        <Stack
                            className = "register-page-stack"
                            spacing ={1}
                            divider = {<Divider orientation='vertical' flexItem/>}
                    >

                            <div>
                                <Typography variant = "h4">
                                    { errorMessage === 'user already exists' ? "User Already Exist" : "Register" }
                                </Typography>
                            </div>
                            <div>
                                <TextField onChange={handleChange} name = "email"  className = "register-page-text-field" label = "Email" variant='outlined'/>
                            </div>
                            <div>
                                <TextField onChange={handleChange} name = "username" className = "register-page-text-field" label = "username" variant = "outlined" />
                            </div>
                            <div>
                                <TextField onChange={handleChange} name = "password"  className = "register-page-text-field" label = "password" variant = "outlined" type = "password" />
                            </div>
                            <div>
                                <Button type = "submit"  name = "submit-btn" size = "large" className = "register-page-text-field" variant = "outlined">
                                    Register
                                </Button>
                            </div>
                            <div>
                                <p className = "register-page-para" onClick = {() => navigate('/')}>
                                    already have an account? Login
                                </p>
                            </div>
                        </Stack>
                    </form>
                </Paper>
            </div>
        </section>
    </>
  )
}

export default Register