import React, {useState, useEffect} from 'react'
import { Paper, Rating } from '@mui/material'
import './coursetitle.css'
import axios from 'axios'
const CourseTitle = ({courseDetails, isLoading}) => {
    const [restObject, setRestObject] = useState({});
    
    return (
    <>

        <section className="specific-course-details">
            {
                isLoading ? (
                    <>
                        <h1>Loading</h1>
                    </>
                ) : (
                    <>
                        <div className="specific-course-details-first-col">
                            <h4 className = "course-name-title">
                                {courseDetails.courseName || "error finding the course"}
                            </h4>
                            <p className = "short-desc-course">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sunt aperiam dolorem cupiditate corrupti! Eligendi temporibus nostrum et quos porro.
                            </p>
                            <div className="rating">
                                <span className="rating-text">
                                    {courseDetails.rating}
                                </span>
                                <Rating sx={{filter: 'invert(100);', color: "#000"}} name="read-only" value={courseDetails.rating || 0} readOnly />
                                
                            </div>
                            <p className = "course-language">
                                English
                            </p>
                            <div className="developed-by">
                                <span className="created-by">
                                    Created by:
                                </span>
                                <span className = "developers-username">
                                    {courseDetails.author.username}
                                </span>
                            </div>
                        </div>
                        <Paper className = "specific-course-paper" sx={{height: "62vh", width: "28vw"}} elevation={4}>
                            <img className ="specific-course-img" src="https://www.freecodecamp.org/news/content/images/2021/06/backendpython.png" alt="" />
                            <div className="specific-course-item-details">
                                <ul className = "fixed-pos-li">
                                    <li>
                                        <h4>
                                            ${courseDetails.price}                        
                                        </h4>
                                    </li>
                                    <li className = "policy">10-Day Money-Back Guarantee</li>
                                    <li className='policy'>Full Lifetime Access</li>
                                    <li className = "cart-btn-container">
                                        <button className = "cart-btn">Add to cart</button>
                                    </li>
                                    <li className = "buy-btn-container">
                                        <button className = "buy-btn">
                                            Buy this course
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </Paper>  
                    </>
                )
            }
            
        </section>
    </>
  )
}

export default CourseTitle