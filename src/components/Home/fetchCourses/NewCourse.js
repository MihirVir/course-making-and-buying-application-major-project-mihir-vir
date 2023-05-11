import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./newcourse.css";
import { URL } from "../../../URL";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NewCourse = ({ accessToken }) => {
  const [result, setResult] = useState([]);
  const fetchCourseRecData = async () => {
    const url = `${URL}test/recommendation`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setResult(res.data);
  };

  useEffect(() => {
    fetchCourseRecData();
  }, []);
  return (
    <>
      <section className="home-card-rec">
        <div className="home-card-rec-title">
          <h3 className="section-title text-center">New Courses</h3>
        </div>
        <div className="div-for-center">
          <div className="div-for-better">
            <Carousel responsive={responsive} containerClass="div-for-better">
              {result.length > 0 &&
                result.map((item, idx) => {
                  return (
                    <>
                      <div
                        key={idx}
                        className="paper-bg"
                        variant="outlined"
                        elevation={24}
                      >
                        <div className="items-container">
                          <img
                            src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png"
                            alt=""
                          />
                          <div className="name-and-price">
                            <span className="name">{item.courseName}</span>
                            <div className="price">${item.price}</div>
                          </div>
                          <div className="rating-container">{item.rating}</div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewCourse;
