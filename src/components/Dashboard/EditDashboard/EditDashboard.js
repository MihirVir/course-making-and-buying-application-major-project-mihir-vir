import React, { useEffect, useState } from "react";
import MainHeader from "../MainHeader/MainHeader";
import NavDash from "../NavDash/NavDash";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { URL } from "../../../URL";
import DeleteIcon from "@mui/icons-material/Delete";
import "./editdashboard.css";
const EditDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseName, setCourseName] = useState("");
  const id = document.URL.split("/")[5];
  const setEditIndex = useState(0);
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
  const handleInputOpen = () => {
    setIsOpen((prev) => !prev);
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

  const setOpenDelete = (idx, template) => {
    setConfirmDelete((prev) => !prev);
    setIndex({
      id: idx,
      template: template,
    });
  };
  const handleEditMode = (idx) => {
    setIsEditMode((prev) => !prev);
    setEditIndex(idx);
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
                className="confirm-delete-edit-videos-pop"
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
          <div className="edit-course-video">
            <form></form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditDashboard;
