import React from 'react'
import {Paper } from '@mui/material'
import {Link} from 'react-router-dom'
import "./coursedetail.css"
const CourseDetail = ({ courseDetails, purchased, isLoading }) => {
  return (
    <>
        <section className="topic-container-section">
          {
            isLoading ? (
              <>
                <h1>Loading...</h1>
              </>
            ) : (
              <>
              <div className="topic-paper-container">
                  <div className="course-content-details">
                          <span className = "course-desc-paper-container">C</span>
                          <span className = "course-desc-paper-container">O</span>
                          <span className = "course-desc-paper-container">U</span>
                          <span className = "course-desc-paper-container">R</span>
                          <span className = "course-desc-paper-container">S</span>
                          <span className = "course-desc-paper-container">E</span>
                          <span className = "course-desc-paper-container">&nbsp;</span>
                          <span className = "course-desc-paper-container">C</span>
                          <span className = "course-desc-paper-container">O</span>
                          <span className = "course-desc-paper-container">N</span>
                          <span className = "course-desc-paper-container">T</span>
                          <span className = "course-desc-paper-container">E</span>
                          <span className = "course-desc-paper-container">N</span>
                          <span className = "course-desc-paper-container">T</span>
                        
                          <ol className = "topic-list">
                              {courseDetails.title ? courseDetails?.title.map((item, idx) => {
                                return (
                                  <>
                                    {purchased ? (<li className = "course-content-li">
                                        <Link to = {`/course/video/${courseDetails._id}/${idx}`}>
                                          {item}
                                        </Link>
                                    </li>) : (
                                      <>
                                          <li className = "course-content-li">
                                              <Link>
                                                {item}
                                              </Link>
                                          </li>
                                      </>
                                    )}
                                  </>
                                )
                              }) : (
                                <>
                                  No Course Content
                                </>
                              )}
                          </ol>
                  </div>
                </div>
                <div className="desc-paper-container">
                        <span className = "course-desc-paper-container">D</span>
                        <span className = "course-desc-paper-container" >E</span>
                        <span className = "course-desc-paper-container" >S</span>
                        <span className = "course-desc-paper-container">C</span>
                        <span className = "course-desc-paper-container">R</span>
                        <span className = "course-desc-paper-container">I</span>
                        <span className = "course-desc-paper-container">P</span>
                        <span className = "course-desc-paper-container">T</span>
                        <span className = "course-desc-paper-container">I</span>
                        <span className = "course-desc-paper-container">O</span>
                        <span className = "course-desc-paper-container">N</span>
                        <p className = "topic-paper-desc-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. At dolores repellat adipisci iusto, laudantium veniam quidem recusandae quasi consectetur rerum qui similique temporibus rem fugit, necessitatibus totam eum harum expedita cupiditate. Pariatur distinctio praesentium fuga deleniti itaque, repellendus ex voluptatum. Incidunt, quam corrupti. Non adipisci hic ipsam distinctio vero officiis voluptatem, rerum veritatis et, nam ratione corporis asperiores dolorem quos itaque. Perferendis aliquam, repellendus, eaque corporis corrupti optio ratione, quidem doloremque repellat expedita aperiam sequi aspernatur. Autem deserunt officia nostrum.</p>
                </div>
              </>
            )
          }
            
        </section>
    </>
  )
}

export default CourseDetail