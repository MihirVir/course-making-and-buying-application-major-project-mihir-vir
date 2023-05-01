import React, { useEffect, useState } from "react";
import MainHeader from "../MainHeader/MainHeader";
import NavDash from "../NavDash/NavDash";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { URL } from "../../../URL";
import DeleteIcon from "@mui/icons-material/Delete";
import "./editdashboard.css";
const EditDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [idx, setIdx] = useState(-1);
  const [newTitle, setNewTitle] = useState("");
  const id = document.URL.split("/")[5];
  const [file, setFile] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [ani, setAni] = useState(false);
  const [index, setIndex] = useState({
    id: -1,
    template: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [course, setCourse] = useState();
  const fetchCourse = async () => {
    setIsLoading(true);
    try {
      const url = `${URL}test/${id}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (res.status === 200) {
        setCourse(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const url = `${URL}video/${id}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (res.status === 200) {
        setVideos(res.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchVideos();
  }, []);
  const handleInputOpen = (idx) => {
    setIsOpen((prev) => !prev);
    setEditIndex(idx);
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    try {
      const url = `${URL}test/${id}`;

      const res = axios.put(
        url,
        { courseName: courseName },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      fetchCourse();
    } catch (err) {
      console.log(err);
    }
  };
  const handlingMode = () => {
    setIsEditMode(false);
    setAni((prev) => !prev);
  };
  const setOpenDelete = (idx, template) => {
    setConfirmDelete((prev) => !prev);
    setIndex({
      id: idx,
      template: template,
    });
  };
  const handleEditMode = (idx) => {
    setIsEditMode(!isEditMode);
    setIdx(idx);
  };
  const handleInputChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleDeleteIndex = async (e) => {
    e.preventDefault();
    try {
      const url = `${URL}video/${id}`;
      const resp = await axios.put(
        url,
        {
          idx: index.id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      setOpenDelete(false);
      fetchCourse();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewVideoTitle = async (e) => {
    e.preventDefault();
    try {
      const url = `${URL}video/title/${id}`;
      console.log("submiting");
      const res = await axios.put(
        url,
        { idx: idx, title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      fetchCourse();
      fetchVideos();
      setIsEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(course);
  const handleImageChange = (e) => {
    const filer = e.target.files[0];
    setFile(filer);
  };
  console.log(file);
  const handleNewVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${URL}video/video/${id}`;
      const data = new FormData();
      data.append("video", file);
      data.append("idx", idx);
      const res = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      fetchVideos();
      setIsEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavDash />
      <MainHeader title="Edit" />
      <section className="edit-dashboard-section bg-black">
        <div className="edit-dashboard-section-container">
          <div className="edit-dashboard-section-information-container">
            <div className="edit-dashboard-section-information-wrapper bg-slate-900">
              <h4 className="edit-dashboard-section-coursename">
                {course?.courseName}
              </h4>
              <EditIcon onClick={handleInputOpen} />
              {isOpen && (
                <>
                  <form onSubmit={handleNameChange}>
                    <input
                      className="edit-text-course-name-inp text-black"
                      name="edit"
                      placeholder="change course name"
                      type="text"
                      value={courseName}
                      onChange={handleInputChange}
                    />
                    <button
                      className="edit-course-change-name-btn"
                      type="submit"
                    >
                      change
                    </button>
                  </form>
                </>
              )}
            </div>
            <div className="delete-dashboard-table-heading text-white">
              <span className="bg-black table-heading">Serial Number</span>
              <span className="bg-black table-heading">Course Name</span>
              <span className="bg-black table-heading">Action</span>
            </div>

            {course?.title.map((item, idx) => {
              return (
                <>
                  <div
                    key={idx}
                    className="delete-dashboard-table-contents text-white"
                  >
                    <span className="custom-serial-delete delete-dashboard-table-content bg-slate-800">
                      {idx + 1}
                    </span>
                    <span className="delete-dashboard-table-content bg-slate-800">
                      {item}
                    </span>
                    <span className="delete-dashboard-table-content bg-slate-800">
                      <EditIcon
                        style={{
                          marginRight: "1rem",
                        }}
                        onClick={() => {
                          handleEditMode(idx);
                        }}
                      />
                      <DeleteIcon
                        onClick={() => setOpenDelete(idx, course?.template)}
                      />
                    </span>
                  </div>
                </>
              );
            })}
          </div>
          {confirmDelete && (
            <>
              <div
                className={`confirm-delete-edit-videos-pop`}
                style={{
                  background: `url(${URL}templates/${index.template}) `,
                  backgroundSize: "cover",
                }}
              >
                <form
                  className="confirm-edit-delete-form"
                  onSubmit={handleDeleteIndex}
                >
                  <h3 className="confirm-text">
                    Are you sure you wanna delete this video?
                  </h3>
                  <button className="delete-confirm-btn-edit" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </>
          )}
          {isEditMode && (
            <>
              <div
                className={
                  isEditMode
                    ? `edit-course-video active-video`
                    : ani
                    ? `edit-course-video not-active-video`
                    : "edit-course-video"
                }
              >
                <div
                  onClick={handlingMode}
                  className="close-icon-container  edit-course-close-icons text-white  right-10 top-8"
                >
                  <h2 className="edit-action-title">Edit Action</h2>
                  <CloseIcon onClick={handlingMode} />
                </div>
                <form
                  className="edit-course-video-form"
                  onSubmit={handleNewVideoTitle}
                >
                  <label className="text-slate-300 custom-edit-course-label">
                    Title
                  </label>
                  <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    name="videoTitle"
                    placeholder="new video title"
                    type="text"
                    className="bg-slate-900 custom-edit-course-inp"
                  />
                  <button
                    className="custom-edit-course-btn bg-slate-600 hover:bg-slate-700"
                    type="submit"
                  >
                    Change Title
                  </button>
                </form>
                <form onSubmit={handleNewVideoSubmit}>
                  <h2 className="text-slate-300 mt-4 custom-edit-course-label">
                    Change Video
                  </h2>
                  <input
                    className="mt-1 text-white bg-slate-800 edit-course-file-inp"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <button
                    type="submit"
                    className="text-white mt-2 custom-edit-course-btn bg-slate-600"
                  >
                    Submit
                  </button>
                </form>
                <p className="text-white custom-edit-course-p">
                  After Submitting the any of the following the box will close
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default EditDashboard;
