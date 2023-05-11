import React, { useState, useEffect } from "react";
import { registerables, Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import { URL } from "../../../URL";
import "./stats.css";
Chart.register(...registerables, ArcElement, Tooltip, Legend);
const Stats = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState();
  const [pieData, setPieData] = useState([]);
  const [empty, setEmpty] = useState(false);
  console.log(pieData);
  const testData = {
    labels: pieData.sortedCourses?.map((item) => item?.course.courseName),
    datasets: [
      {
        data: pieData.sortedCourses?.map((item) => item?.count),
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
  // fetch line graph data
  const fetchGraphsData = async () => {
    try {
      const url = `${URL}admin/`;
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
      const url = `${URL}admin/graphs`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (res.data.sortedCourses === 0) {
        setEmpty(true);
      } else {
        setPieData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // fetch course count
  const fetchCourseCount = async () => {
    try {
      setIsLoading(true);
      const url = `${URL}admin/count`;
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
      setEmpty(true);
      console.log(err);
    }
  };
  console.log(empty);
  useEffect(() => {
    fetchCourseCount();
    fetchGraphsData();
    fetchPieData();
  }, []);

  return (
    <>
      {empty ? (
        <>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            className="user-stats-section bg-slate-800 "
          >
            <h1
              style={{
                fontSize: "3rem",
              }}
              className="text-white"
            >
              Nothing Sold Yet
            </h1>

            <p
              style={{
                width: "400px",
                textAlign: "center",
              }}
              className="text-slate-400"
            >
              we will inform you once someone purchases your products
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="user-stats-section bg-slate-800">
            <div className="user-stats-container">
              <div className="user-stats-card-container  bg-black">
                <span className="text-white user-custom-title">
                  Total Courses
                </span>
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
                <span className="text-white user-custom-title">
                  Courses Sold
                </span>
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
                <span className="text-white user-custom-title">
                  Total Earnings
                </span>
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
              <div className="user-stats-card-container   bg-black supreme-review-grid-user">
                <span className="text-white user-custom-title">
                  Average Rating
                </span>
                <span className="text-green-500 user-total-grand">
                  {pieData.rating}
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
              <div
                className="user-line-graph pie-graph-edit"
                style={{
                  height: "400px",
                }}
              >
                <h4 className="user-graph-titles">Top Three Selling Courses</h4>
                <Pie data={testData} options={options}></Pie>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Stats;
