import React, {useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { Paper, Avatar, duration } from '@mui/material';
import {easeInOut, motion} from 'framer-motion'
import './custom.css'
import axios from 'axios';
const CustomNav = () => {
    const [text, setText] = useState("");
    const [isResultOpen, setResultOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    function handleOptionsClick() {
        setIsOptionsOpen(!isOptionsOpen);
    }


    const fetchData = async () => {
        const searchURL = `https://backend-course-app-production-1670.up.railway.app/test/search?q=${text}`
        const response = await axios.get(searchURL);
        setResults(response.data);

        
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login");
    }
    console.log(results);
    useEffect(() => {
        if (text.length > 2) {
            setResultOpen(true);
        } else {
            setResultOpen(false)
        }
        fetchData();
    }, [text])

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <p className = "site-heading-title">
                                Major Project Mihir
                            </p>
                        </li>
                        <li className='search-dept'>
                            <form className='search-text-form'>
                                <input autoComplete='false' name = "search" onChange = {(e) => setText(e.target.value)} className='search-inp' type="text" placeholder='type to search'/>
                            </form>
                            {
                                isResultOpen 
                                &&
                                <div className="search-results">
                                    {
                                        isResultOpen 
                                        &&
                                        <Paper className = "paper-bg-results" elevation={5}  sx = {{height: "25vh"}}>
                                            <div className="link-nav-holders">
                                                {
                                                    results.length > 0 ? results.map((item ,idx) => {
                                                        return (
                                                            <>
                                                                <a href={`/course/${item._id}`}>{item.courseName}</a>
                                                            </>
                                                        )
                                                    }) : <a href="">No Results</a>
                                                }
                                            </div>
                                        </Paper>
                                    }
                                </div>
                            }
                        </li>
                        {
                         !JSON.parse(localStorage.getItem("token"))  ? (
                            <>
                                <li>
                                    <Link to = "/login">
                                        <motion.button
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 1, easeInOut}}
                                            className='nav-auth-btn'
                                        >
                                            Login
                                        </motion.button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to = "/register">
                                        <button className='nav-auth-btn'>
                                            Sign Up
                                        </button>
                                    </Link>
                                </li>
                            </>
                         ) : (
                            <>
                                <li>
                                    <motion.button
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 1, easeInOut}}
                                        onClick={handleLogout}
                                        className =  "nav-auth-btn"
                                    >
                                        Logout
                                    </motion.button>
                                </li>
                                
                                <li className = "option-menu">
                                    <MoreVertIcon onClick = {handleOptionsClick}/>
                                    {
                                        isOptionsOpen 
                                        &&
                                        <div className="user-options-result">
                                            <Paper className = "paper-styling-options" sx = {{height: "25vh", width: "14vw"}}  >
                                                <div className="option-items-container">
                                                    <div className="avatar-and-username">
                                                        <Avatar className = "nav-avatar" src = "https://i.scdn.co/image/ab67616d0000b27324873164c69c38a8fe2d9730"/>
                                                        <span className='nav-username'>Mihir</span>
                                                        <ShoppingCartIcon />
                                                    </div>
                                                    <p className = "options dashboard">Dashboard</p>
                                                    <p className = "options">Update Account</p>
                                                    <p className = "options">Delete Account</p>
                                                </div>
                                            </Paper>

                                        </div>
                                    }
                                </li>
                            </>
                         )
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default CustomNav