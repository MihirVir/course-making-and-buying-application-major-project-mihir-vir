import React, {useState, useRef} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';
import './navdash.css';
const NavDash = () => {
    const [isFull, setIsFull] = useState(false);
    const menuRef = useRef();
    const handleMenuOn = () => {
        setIsFull(!isFull);
        console.log(menuRef.current.offsetWidth);
    }


    return (
        <>
            <section className="nav-dash-section">
                <div className="nav-dash-contaner">
                    <div ref = {menuRef} style={isFull ? {width: "180px"} : {width: "80px"}} className="welcome-nav-dash-info-container">
                        <MenuIcon onClick = {handleMenuOn} style = {isFull ? {marginRight: ".4em", marginLeft: ".4em"} : {marginRight: "0"}} className = "nav-dash-burger-menu" />
                        <span style={isFull ? {display: "inline", padding: "0px 10px 0px 0px", opacity: "1"} : { display: "none" }} className='nav-dash-welcome-txt'>Welcome, Mihir</span>
                    </div>
                    <div className="nav-dash-list-items">
                        <ul className = "nav-dash-list-items-ul">
                            <Link reloadDocument className='dash-links' to = "/dashboard/upload">
                                <li>
                                    <UploadIcon style = {!isFull ? {width: "100%",display: "flex", justifyContent: "center", alignItems: "center"} : {}} /> 
                                    { isFull &&
                                            <span>
                                                Upload
                                            </span> 
                                    }
                                </li>
                            </Link>
                            <Link reloadDocument className = "dash-links" to = "/dashboard/edit">
                                <li>
                                    <EditIcon style = {!isFull ? {width: "100%",display: "flex", justifyContent: "center", alignItems: "center"} : {}} />
                                    {
                                        isFull && (
                                                <span>Edit</span>
                                                )
                                            }
                                </li>
                            </Link>
                            <Link reloadDocument className='dash-links' to = "/dashboard/delete">
                                <li>
                                    <DeleteIcon style = {!isFull ? {width: "100%",display: "flex", justifyContent: "center", alignItems: "center"} : {}}/>
                                    {isFull && (
                                            <span>Delete</span>
                                    )}
                                </li>
                            </Link>
                            <Link reloadDocument className='dash-links' to = "/dashboard/statistics">
                                <li>
                                    <LeaderboardIcon style = {!isFull ? {width: "100%",display: "flex", justifyContent: "center", alignItems: "center"} : {}}/>
                                    {isFull && (
                                            <span>Statistics</span>
                                            )}
                                </li>
                            </Link>
                            <Link reloadDocument className= "dash-links" to = "/dashboard/users">
                                <li>
                                    <PeopleAltIcon style = {!isFull ? {width: "100%",display: "flex", justifyContent: "center", alignItems: "center"} : {}}/>
                                    {
                                        isFull && (
                                                <span>Users</span>
                                                )
                                            }
                                </li>
                            </Link>
                            <Link className='dash-links' reloadDocument to = "/dashboard/returns">
                                <li>
                                    <KeyboardReturnIcon style = {!isFull ? {width: "100%",display: "flex", justifyContent: "center", alignItems: "center"} : {}}/> 
                                    {
                                        isFull && (
                                                <span>returns</span>
                                                )
                                            }
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NavDash