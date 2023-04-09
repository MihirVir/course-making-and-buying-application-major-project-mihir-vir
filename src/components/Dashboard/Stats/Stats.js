import React, { useState, useEffect } from "react";
import { registerables, Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "./stats.css";
Chart.register(...registerables, ArcElement, Tooltip, Legend);
const Stats = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState();
  const [pieData, setPieData] = useState([]);
  const testData = {
    labels: pieData.map((item) => item?.course.courseName),
    datasets: [
      {
        data: pieData.map((item) => item?.count),
        backgroundColor: [
          "rgb(245,146,65)",
          "rgb(231,207,93)",
          "rgb(254,252,232)",
        ],
        borderColor: ["rgb(245,146,65)", "rgb(231,207,93)", "rgb(254,252,232)"],
      },
    ],
  };
  const options = {};
  // fetch graph data
  const fetchGraphsData = async () => {
    try {
      const url = "http://localhost:8000/admin/";
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setGraphData(res.data);
    } catch (err) {}
  };

  // fetch pie data
  const fetchPieData = async () => {
    try {
      const url = `http://localhost:8000/admin/graphs`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setPieData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    fetchGraphsData();
    fetchPieData();
  }, []);

  console.log(pieData);
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
            <span className="text-white user-custom-title">Total Earnings</span>
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
                  "May",
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
                    data: graphData,
                    borderColor: "rgb(255, 99 .132)",
                    backgroundColor: "rgba(255, 99 132, .5)",
                  },
                ],
              }}
            />
          </div>
          <div className="user-line-graph pie-graph-edit">
            <h4 className="user-graph-titles">Top Three Selling Courses</h4>
            <Pie data={testData} options={options}></Pie>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
