import React, { useState, useEffect } from "react";
import { registerables, Chart } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "./stats.css";
Chart.register(...registerables);
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
      <section className="user-stats-section bg-slate-800">
        <div className="user-stats-container">
          <div className="user-stats-card-container  bg-black">
            <span className="text-white user-custom-title">Total Courses</span>
            <span className="text-white user-custom-title user-custom-title-active">
              {data?.course?.length}
            </span>
            <div className="user-stats-svg">
              <img
                className="user-online-course-img"
                src="/online-course.svg"
                alt="no img available"
              />
            </div>
          </div>
          <div className="user-stats-card-container  bg-black">
            <span className="text-white user-custom-title">Courses Sold</span>
            <span className="text-white user-custom-title user-custom-title-active">
              {data?.sold?.length}
            </span>
            <div className="user-stats-svg">
              <img
                className="user-online-course-img"
                src="/sold.svg"
                alt="no img available"
              />
            </div>
          </div>
          <div className="user-stats-card-container  bg-black supreme-grid-user">
            <span className="text-white user-custom-title">Money Earned</span>
            <span className="text-green-500 user-total-grand">
              ${data?.money}
            </span>
            <div className="user-stats-svg">
              <img
                className="user-online-course-img"
                src="/money.svg"
                alt="no img available"
              />
            </div>
          </div>
          <div className="user-line-graph-chart">
            <Line
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "Dataset 1",
                    data: [12, 20, 23, 14, 55, 100, 1, 200, 210, 212, 300, 312],
                    borderColor: "rgb(255, 99 .132)",
                    backgroundColor: "rgba(255, 99 132, .5)",
                  },
                ],
              }}
            />
          </div>
          <div className="user-line-graph">
            <Line
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "Dataset 1",
                    data: [12, 20, 23, 14, 55, 100, 1, 200, 210, 212, 300, 312],
                    borderColor: "rgb(255, 99 .132)",
                    backgroundColor: "rgba(255, 99 132, .5)",
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
