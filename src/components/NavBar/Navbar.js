import React, {useEffect, useState} from 'react'
import { Checkbox, Avatar } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import './nav.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchData, setSearchData] = useState("");
    const [result, setResult] = useState([]);
    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }
    const handleSearchChange = (e) => {
        setSearchData(e.target.value);
    }
    const fetchData = async () => {
        const url = `http://localhost:8000/course/search?q=${searchData}`;
        const result = await axios.get(url);
        setResult(result.data);
    }
    useEffect(() => {
        fetchData();
    }, [searchData]);
    return (
        <>
            <header className = "header">
                <nav className = "nav">
                    <div className="heading-nav-container">
                        <span className='nav-bar-site-name'>
                            Hustlers University
                        </span>
                        <span className = "settings-nav-thing">
                            <MoreVertIcon onClick = {handleIsOpen}/>
                            { 
                                isOpen && (
                                    <>
                                        <div className="settings-nav-bar-details">
                                            <div className="nav-avatar-and-username">
                                                <Avatar className = "nav-avatar" src = "https://i.scdn.co/image/ab67616d0000b27324873164c69c38a8fe2d9730"/>
                                                <span className='nav-username'>Mihir</span>
                                            </div>
                                            <span className="settings-options">
                                                <p>Dashboard</p>
                                                <p>Classroom</p>
                                                <p>Update Account</p>
                                                <p>Delete Account</p>
                                                <p>Return Course</p>                                           
                                            </span>
                                        </div>
                                    </>
                                )
                            }
                        </span>
                    </div>
                    <div className="search-nav-field">
                        <span className='filtering-bars'>
                            <input onChange = {handleSearchChange} className = "search-bar" type="text" placeholder='Search...'/>
                            {/* <span className = "search-nav-field-filter-options">
                                Popular Filters
                            </span> */}
                            
                        </span>
                        
                        <span className = "trap">
                            {
                                searchData.length > 0 && (
                                    <div className="search-options">
                                        {
                                            result.length > 0 ? result.map((item) => {
                                                return (
                                                    <>
                                                         <a key = {item._id} href={`http://localhost:8000/course/${item._id}`}>{item.courseName}</a>
                                                    </>
                                                )
                                            }) : <a href="">No Result</a>
                                        }
                                    </div>
                                )
                            }
                            <div className="filter-options-used">
                                <span className = "search-nav-field-filter-options">
                                    Popular Filters
                                </span>
                                <span className = "check-box-nav">
                                    <label>
                                        <input className = "checkbox" type="checkbox" name = "JS" value = "JS"/>
                                        JavaScript
                                    </label>
                                    <label>
                                        <input className = "checkbox" type="checkbox" name = "Java" value = "Java"/>
                                        Java
                                    </label>
                                    <label>
                                        <input className = "checkbox" type="checkbox" name = "Python" value = "Python"/>
                                        Python
                                    </label>
                                </span>
                                
                                <span className = "btn-placement">
                                    <button className='btn-search'>
                                        Search Tags
                                    </button>
                                </span>
                                
                            </div>
                        </span>
                    </div>
                    
                </nav>
            </header>
        </>
    )
}

export default Navbar