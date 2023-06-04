import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../URL";
import { useNavigate } from "react-router-dom";
import "./classroom.css";

const Classroom = () => {
  const [courseList, setCourseList] = useState([]);
  const nav = useNavigate();
  const fetchCourseList = async () => {
    try {
      const url = `${URL}newer`;
      // getting data from the backend
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      // setting the course list
      setCourseList(response.data.course);
    } catch (err) {
      console.log(err);
    }
  };
  const handleNavigation = (id) => {
    nav(`/course/${id}/0`);
  };
  useEffect(() => {
    fetchCourseList();
  }, []);
  return (
    <>
      <section className="classroom-section bg-slate-900">
        <div className="classroom-section-card-wrapper">
          {courseList.map((item, idx) => {
            return (
              <>
                <div
                  onClick={() => handleNavigation(item.coursesPurchased._id)}
                  key={idx}
                  className="classroom-section-card"
                >
                  <div className="flex-wala-thingy">
                    <img
                      className="img-purchaser-handler"
                      src={`${URL}templates/${item.coursesPurchased.template}`}
                      alt="no img found"
                    />
                    <div className="ml-2 inner-div">
                      <span>
                        {item.coursesPurchased.courseName.substring(0, 10)}...
                      </span>
                      {item.coursesPurchased.tags.map((i, idx) => {
                        return (
                          <>
                            <span className="styling-the-tags">#{i}</span>
                          </>
                        );
                      })}
                      <span className="video-count">
                        Total Number of videos:{" "}
                        {item.coursesPurchased.title.length}
                      </span>
                      <span className="course-price">
                        ${item.coursesPurchased.price}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Classroom;
