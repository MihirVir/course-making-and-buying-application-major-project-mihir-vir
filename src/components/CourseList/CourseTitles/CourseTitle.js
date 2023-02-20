import React from 'react'
import { Paper, Rating } from '@mui/material'
import './coursetitle.css'
const CourseTItle = () => {
  return (
    <>
        <section className="specific-course-details">
            <div className="specific-course-details-first-col">
                <h4 className = "course-name-title">
                    Introduction To Backend Development Using NodeJS
                </h4>
                <p className = "short-desc-course">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sunt aperiam dolorem cupiditate corrupti! Eligendi temporibus nostrum et quos porro.
                </p>
                <div className="rating">
                    <span className="rating-text">
                        4
                    </span>
                    <Rating name="read-only" value={3.5} readOnly />
                    <span className="rated-by">
                        (100 ratings)
                    </span>
                </div>
                <p className = "course-language">
                    English
                </p>
                <div className="developed-by">
                    <span className="created-by">
                        Created by:
                    </span>
                    <span className = "developers-username">
                        Mihir Vir
                    </span>
                </div>
            </div>
            <Paper className = "specific-course-paper" sx={{height: "62vh", width: "28vw"}} elevation={4}>
                <img className ="specific-course-img" src="https://www.freecodecamp.org/news/content/images/2021/06/backendpython.png" alt="" />
                <div className="specific-course-item-details">
                    <ul className = "fixed-pos-li">
                        <li>
                            <h4>
                                $440                        
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
        </section>
    </>
  )
}

export default CourseTItle