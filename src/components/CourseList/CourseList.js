import React, { useState, useEffect } from "react";
import CustomNav from "../CustomNav/CustomNav";
import CourseTitle from "./CourseTitles/CourseTitle";
import "./courselist.css";
import CourseDetail from "./CourseDetails/CourseDetail";
import CourseVideo from "./CourseVideo/CourseVideo";
import { URL } from "../../URL";
import axios from "axios";
const CourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({
    author: {
      username: "",
    },
  });
  const [isPurchased, setIsPurchased] = useState(false);

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

    setCourseDetails(result.data);
    setLoading(false);
    if (result.data.isPurchased != null) {
      setIsPurchased(true);
    }
  };
  console.log(courseDetails);
  console.log("courseDetails", courseDetails);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(courseDetails);
  return (
    <>
      <section onContextMenu={(e) => e.preventDefault()}>
        <CustomNav />
        <CourseTitle
          courseDetails={courseDetails}
          purchased={isPurchased}
          isLoading={loading}
        />
        <CourseDetail
          courseDetails={courseDetails}
          purchased={isPurchased}
          isLoading={loading}
        />
        <CourseVideo />
      </section>
    </>
  );
};

export default CourseList;
