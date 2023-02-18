import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material';
import axios from 'axios'
import './newcourse.css'
import GetCookie from '../../../hooks/GetCookie';
const NewCourse = ({accessToken}) => {
  const [result, setResult] = useState([]);
  // https://emantav.in/wp-content/uploads/2021/04/Pte-course-img.png
  // {
  //   result.map((item) => {
  //     return (
  //       <>
  //           <a href={`http://localhost:8000/course/${item._id}`}>

  //               <div key = {item._id} className="card-container">
  //                 <img className='card-img' src="https://www.maacindia.com/images/courses/course-img-35.jpg" alt="" />
  //                 <div className="card-course">
  //                   <div className="name-and-price">
  //                     <span>{item.courseName}</span>
  //                     <span>{item.price}</span>
  //                   </div>
  //                   <div className="rating">
  //                     <p>
  //                       {item.rating}
  //                     </p>
  //                   </div>
  //                 </div>
  //             </div>
  //           </a>
  //       </>
  //     )
  //   })
  // }
 
  const fetchCourseRecData = async () => {
      const url = `http://localhost:8000/course/recommended`
      const result = await axios.get(url, {
        withCredentials: true
      });
      setResult(result.data)
  }

  useEffect(() => {
    fetchCourseRecData();
  }, [])
    return (
      <>
        <section className="home-card-rec">
            <div className="home-card-rec-title">
              <h3 className = "section-title">
                Recommended Courses
              </h3>
            </div>
            <div className="home-rec-card">
              <div className="home-rec-card-items">
                {
                  result.map((item, idx) => {
                    return (
                      <>
                        <Paper key = {idx} className = "paper-bg" sx = {{backgroundColor: "rgb(28,29,31)",  transition: "all 200ms ease-in-out;"}} variant='outlined' elevation={24}>
                            <div className="items-container">
                              <img src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png" alt="" />
                              <div className="name-and-price">
                                <span className="name">
                                    {item.courseName}
                                </span>
                                <div className="price">
                                  ${item.price}
                                </div>
                              </div>
                              <div className="rating-container">
                                {item.rating}
                              </div>
                            </div>
                        </Paper>
                      </>
                    )
                  })
                }
              </div>
            </div>
        </section>
      </>
    );
}

export default NewCourse