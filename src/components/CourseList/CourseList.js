import React, {useState, useEffect} from 'react'
import CustomNav from '../CustomNav/CustomNav'
import CourseTitle from './CourseTitles/CourseTitle'
import './courselist.css'
import CourseDetail from './CourseDetails/CourseDetail'
import CourseVideo from './CourseVideo/CourseVideo'
import axios from 'axios'
const CourseList = () => {
  const [courseDetails, setCourseDetails] = useState({
      author: {
          username: ""
      }
  });
  const [isPurchased, setIsPurchased] = useState(false);

  const url = document.URL;
  const gettingCourseId = url.split('/')[4];
  const fetchData = async () => {
    const url = `https://backend-course-app-production-1670.up.railway.app/course/${gettingCourseId}`
    const result = await axios.get(url, {
      withCredentials: false
    });
    setCourseDetails(result.data.rest);
    if (result.data.isPurchased != null) {
      setIsPurchased(true);
    }
  }
  
  console.log("courseDetails", courseDetails);
  
  useEffect(() => {
    fetchData();
  }, []);
  console.log(courseDetails);
  return (
    <>
      <CustomNav />
      <CourseTitle courseDetails={courseDetails} purchased = {isPurchased}/>
      <CourseDetail courseDetails={courseDetails} purchased ={isPurchased}/>
      <CourseVideo />
    </>
  )
}

export default CourseList