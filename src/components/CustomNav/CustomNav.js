import React, {useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Paper, Avatar } from '@mui/material';
import './custom.css'
import axios from 'axios';
const CustomNav = () => {
    const [text, setText] = useState("");
    const [isResultOpen, setResultOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [results, setResults] = useState([]);
    
    function handleOptionsClick() {
        setIsOptionsOpen(!isOptionsOpen);
    }

    const fetchData = async () => {
        const searchURL = `https://backend-course-app-production.up.railway.app/course/search?q=${text}`
        const response = await axios.get(searchURL);
        setResults(response.data);
    }

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
                            <p className = "site-heading-title" >Hustlers University</p>
                        </li>
                        <li className='search-dept'>
                            <input autoComplete='false' name = "search" onChange = {(e) => setText(e.target.value)} className='search-inp' type="text" placeholder='type to search'/>
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
                                                                <a href={`https://backend-course-app-production.up.railway.app/course/${item._id}`}>{item.courseName}</a>
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
                        <li>
                            <ShoppingCartIcon />
                        </li>
                        <li className = "option-menu">
                            <MoreVertIcon onClick = {handleOptionsClick}/>
                            {
                                isOptionsOpen 
                                &&
                                <div className="user-options-result">
                                    <Paper className = "paper-styling-options" sx = {{height: "25vh", width: "14vw"}}>
                                        <div className="option-items-container">
                                            <div className="avatar-and-username">
                                                <Avatar className = "nav-avatar" src = "https://i.scdn.co/image/ab67616d0000b27324873164c69c38a8fe2d9730"/>
                                                <span className='nav-username'>Mihir</span>
                                            </div>
                                            <p className = "options dashboard">Dashboard</p>
                                            <p className = "options">Update Account</p>
                                            <p className = "options">Delete Account</p>
                                        </div>
                                    </Paper>

                                </div>
                            }
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default CustomNav