import React, {useState, useEffect} from 'react'
import MainHeader from '../MainHeader/MainHeader'
import NavDash from '../NavDash/NavDash'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './videouploader.css'
const VideoUploader = () => {
    const [course, setCourse] = useState({});
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isCourseBelong, setIsCourseBelong] = useState(false);
    const id = document.URL.split("/")[5];
    const navigate = useNavigate();
    const fetchCourseRequest = async () => {
        setIsLoading(true)
        const url = `http://localhost:8000/test/${id}`
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });  
        if (response.status === 200) {
            setCourse(response);
            if (response.data.author._id === JSON.parse(localStorage.getItem("userId"))) {
                setIsCourseBelong(true);
            }
            if (response.data.author._id !== JSON.parse(localStorage.getItem("userId"))) {
                navigate("/");
            }
        } 
        setIsLoading(false)

    }
    // console.log("This is course", course);
    // console.log("is course belongs", isCourseBelong);
    useEffect(() => {
        fetchCourseRequest();
    }, [])

    const handleVideoOnSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("videos", file);
        const url = `http://localhost:8000/video/${id}`;

    }
    console.log(file);
    const handleVideoOnChange = (e) => {
        const filer = e.target.files;
        setFile(filer);
    }
    return (
        <>
        {
            isLoading ? (
                <>
                <h1>Loading... Please Wait</h1>
                </>
            ) : (
                <>
            <NavDash />
            <MainHeader title = "Upload Videos" />
                <div className="video-upload-section-aligner">
                    <section className="video-upload-dashboard-section">
                            <div className="video-upload-section-container bg-black">
                                <div className="video-section-card-container bg-slate-800 rounded">
                                    <div className="course-information-video-container bg-slate-900">
                                        <h4 className="video-dashboard-section-title text-white pl-2 pt-2 font-extralight">
                                            Upload Course Videos
                                        </h4>
                                        <img loading='lazy' className = "video-dashboard-course-template-img" src={`http://localhost:8000/templates/${course?.data?.template}`} alt="" />
                                        <p className='pr-2 text-white'>{course?.data?.courseName}</p>
                                    </div>
                                    <div className="video-course-upload-details">
                                        <p className = "text-white ml-2 mb-2" > author: {course?.data?.author?.username}</p>
                                        <p className = "text-white ml-2 mb-2">Price: ${course?.data?.price} </p>
                                        <span className = "text-white ml-2 mb-2" >Tags: </span>
                                        {
                                        course?.data?.tags.map((item, idx) => {
                                            return (
                                                <>
                                                    <span className = "bg-white p-1 mt-2 mb-2 ml-2 rounded">#{item}</span>
                                                </>
                                            )
                                        })}
                                    </div>
                                    <form onSubmit = {handleVideoOnSubmit} className = "video-section-upload-form">

                                        <label className ="text-white ml-2 mb-2 mt-2">Upload Video</label>
                                        <input multiple onChange = {handleVideoOnChange}  className='bg-black text-white p-2 ml-2 mr-2 rounded hover:bg-slate-900' type="file"  />
                                        <p className = "ml-2 mt-1 italic text-white">Upload Limit Should be of: {course?.data?.title.length}</p>
                                        <button className = "bg-white p-2 m-2 mt-8 hover:bg-gray-200" type = "submit">
                                            Submit
                                        </button>
                                    </form>
                                <p className = "text-white italic text-center text-sm" >Once Uploaded the video you will be redirected</p>
                                </div>
                            </div>
                    </section>
                </div>
                </>
            )
        }
        </>
    )
}

export default VideoUploader