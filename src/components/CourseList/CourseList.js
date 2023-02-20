import React from 'react'
import CustomNav from '../CustomNav/CustomNav'
import CourseTitle from './CourseTitles/CourseTitle'
import './courselist.css'
import CourseDetail from './CourseDetails/CourseDetail'
const CourseList = () => {
  return (
    <>
      <CustomNav />
      <CourseTitle />
      <CourseDetail />
    </>
  )
}

export default CourseList