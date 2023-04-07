import axios from "axios";
import React, { useState, useEffect } from "react";

import "./stats.css";
const Stats = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // fetch course count
  const fetchCourseCount = async () => {
    try {
      setIsLoading(true);
      const url = `http://localhost:8000/admin/count`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCourseCount();
  }, []);
  return (
    <>
      <section className="user-stats-section bg-white">
        <div className="user-stats-container">
          <div className="user-stats-card-container  bg-black">
            <span className="text-white user-custom-title">Total Courses</span>
            <span className="text-white user-custom-title user-custom-title-active">
              {data?.length}
            </span>
            <div className="user-stats-svg">
              <img
                className="user-online-course-img"
                src="/online-course.svg"
                alt="no img available"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
