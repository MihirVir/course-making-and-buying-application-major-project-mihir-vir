import React, { useState, useEffect } from "react";
import CustomNav from "../CustomNav/CustomNav";
import CourseTitle from "./CourseTitles/CourseTitle";
import "./courselist.css";
import CourseDetail from "./CourseDetails/CourseDetail";
import CourseVideo from "./CourseVideo/CourseVideo";
import { useNavigate } from "react-router-dom";
import { URL } from "../../URL";
import axios from "axios";
const CourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const navigate = useNavigate();
  const url = document.URL;
  const gettingCourseId = url.split("/")[4];
  const fetchData = async () => {
    const url = `${URL}test/${gettingCourseId}`;
    const result = await axios.get(url, {
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (result.data.purchased === true) {
      document.location.href = "http://localhost:3000/classroom";
    }
    setCourseDetails(result.data);
    setLoading(false);
    if (result.data.purchased === true) {
      setIsPurchased(true);
    }
  };
  console.log(courseDetails);
  console.log(isPurchased);
  useEffect(() => {
    fetchData();
  }, []);
  console.log("mihir: ", courseDetails);
  return (
    <>
      {courseDetails ? (
        <>
          <section onContextMenu={(e) => e.preventDefault()}>
            <CustomNav />
            <CourseTitle
              courseDetails={courseDetails}
              courseId={gettingCourseId}
              isLoading={loading}
            />
            <CourseDetail courseDetails={courseDetails} isLoading={loading} />
            <CourseVideo />
          </section>
        </>
      ) : (
        <>
          <h4>Error</h4>
        </>
      )}
    </>
  );
};

export default CourseList;
