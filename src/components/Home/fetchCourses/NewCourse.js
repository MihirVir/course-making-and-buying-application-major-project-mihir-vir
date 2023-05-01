import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./newcourse.css";
import { URL } from "../../../URL";
import GetCookie from "../../../hooks/GetCookie";
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
  console.log("using get cookie", GetCookie("access_token"));
  useEffect(() => {
    fetchCourseRecData();
  }, []);
  return (
    <>
      <section className="home-card-rec">
        <div className="home-card-rec-title">
          <h3 className="section-title text-center">New Courses</h3>
        </div>
        <div className="home-rec-card">
          <div className="home-rec-card-items">
            {result.length > 0 ? (
              result.map((item, idx) => {
                return (
                  <>
                    <Paper
                      key={idx}
                      className="paper-bg"
                      sx={{
                        backgroundColor: "rgb(28,29,31)",
                        transition: "all 200ms ease-in-out;",
                      }}
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
                    </Paper>
                  </>
                );
              })
            ) : (
              <>
                <Paper
                  className="paper-bg"
                  sx={{
                    backgroundColor: "rgb(28,29,31)",
                    transition: "all 200ms ease-in-out;",
                  }}
                  variant="outlined"
                  elevation={24}
                >
                  <div className="items-container">
                    <img
                      src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png"
                      alt=""
                    />
                    <div className="name-and-price">
                      <span className="name">test</span>
                      <div className="price">$123</div>
                    </div>
                    <div className="rating-container">4</div>
                  </div>
                </Paper>
                <Paper
                  className="paper-bg"
                  sx={{
                    backgroundColor: "rgb(28,29,31)",
                    transition: "all 200ms ease-in-out;",
                  }}
                  variant="outlined"
                  elevation={24}
                >
                  <div className="items-container">
                    <img
                      src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png"
                      alt=""
                    />
                    <div className="name-and-price">
                      <span className="name">test</span>
                      <div className="price">$123</div>
                    </div>
                    <div className="rating-container">4</div>
                  </div>
                </Paper>
                <Paper
                  className="paper-bg"
                  sx={{
                    backgroundColor: "rgb(28,29,31)",
                    transition: "all 200ms ease-in-out;",
                  }}
                  variant="outlined"
                  elevation={24}
                >
                  <div className="items-container">
                    <img
                      src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png"
                      alt=""
                    />
                    <div className="name-and-price">
                      <span className="name">test</span>
                      <div className="price">$123</div>
                    </div>
                    <div className="rating-container">4</div>
                  </div>
                </Paper>
                <Paper
                  className="paper-bg"
                  sx={{
                    backgroundColor: "rgb(28,29,31)",
                    transition: "all 200ms ease-in-out;",
                  }}
                  variant="outlined"
                  elevation={24}
                >
                  <div className="items-container">
                    <img
                      loading="lazy"
                      src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png"
                      alt=""
                    />
                    <div className="name-and-price">
                      <span className="name">test</span>
                      <div className="price">$123</div>
                    </div>
                    <div className="rating-container">4</div>
                  </div>
                </Paper>
                <Paper
                  className="paper-bg"
                  sx={{
                    backgroundColor: "rgb(28,29,31)",
                    transition: "all 200ms ease-in-out;",
                  }}
                  variant="outlined"
                  elevation={24}
                >
                  <div className="items-container">
                    <img
                      src="https://images.genius.com/16685aa5246f25cbb660782ad7a32735.1000x1000x1.png"
                      alt=""
                    />
                    <div className="name-and-price">
                      <span className="name">test</span>
                      <div className="price">$123</div>
                    </div>
                    <div className="rating-container">4</div>
                  </div>
                </Paper>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewCourse;
