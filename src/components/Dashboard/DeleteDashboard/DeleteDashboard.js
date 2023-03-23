import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./deletedashboard.css";
import { URL } from "../../../URL";
const DeleteDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    courseName: "",
  });
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [recheck, setRecheck] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [error, setError] = useState(false);
  const fetchAllCourse = async () => {
    setIsLoading(true);
    try {
      const url = `${URL}test/user`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (response.status === 200) {
        setCourses(response.data);
        setIsLoading(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);
  console.log(selectedCourse);
  const handleConfirmDeleteBtn = (idx) => {
    setIsDeleteOpen((prev) => !prev);
    setSelectedCourse({
      id: courses[idx]._id,
      courseName: courses[idx].courseName,
    });
  };

  const closeDeleteBtn = async () => {
    setIsDeleteOpen((prev) => !prev);
  };

  const handleDeleteOnClick = async () => {
    setDeleteLoading(true);
    try {
      const url = `${URL}test/${selectedCourse.id}`;
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (res.status === 200) {
        setIsDeleteOpen((prev) => !prev);
        setDeleteLoading(false);
        fetchAllCourse();
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(courses);
  const handleRechecker = (e) => {
    setCourseName(e.target.value);
    if (e.target.value === selectedCourse.courseName) {
      setRecheck(true);
    } else {
      setRecheck(false);
    }
  };

  return (
    <>
      <section className="delete-dashboard-section bg-neutral-900">
        <div className="delete-dashboard-container bg-slate-700 text-white  px-1 py-1 font-bold text-xl">
          <div className={`delete-dashboard-container-header bg-neutral-900 `}>
            <h4 className="delete-dashboard-container-title">
              List Of Courses
            </h4>
          </div>
          <div className="delete-dashboard-table-heading">
            <span className="bg-black table-heading">Serial Number</span>
            <span className="bg-black table-heading">Course Name</span>
            <span className="bg-black table-heading">Delete</span>
            <span className="bg-black table-heading">Edit</span>
          </div>
          {courses.map((item, idx) => {
            return (
              <>
                <div className="delete-dashboard-table-contents ">
                  <span
                    style={{
                      background: `url(${URL}templates/${item.template})`,
                      objectFit: "cover",
                      objectPosition: "top",
                      height: "100%",
                      width: "100%",
                      backgroundSize: "cover",
                    }}
                    className="custom-serial-delete delete-dashboard-table-content bg-slate-800"
                  >
                    {idx + 1}
                  </span>
                  <span className="delete-dashboard-table-content bg-slate-800">
                    {item.courseName.substring(0, 20)}
                    {item.courseName.length > 20 ? "..." : ""}
                  </span>
                  <span className="delete-dashboard-table-content bg-slate-800">
                    <DeleteIcon
                      onClick={() => handleConfirmDeleteBtn(idx)}
                      className="delete-dashboard-delete-btn"
                    />
                  </span>
                  <span className="delete-dashboard-table-content bg-slate-800">
                    <Link reloadDocument to={`/dashboard/edit/${item._id}`}>
                      <EditIcon className="delete-dashboard-edit-btn" />
                    </Link>
                  </span>
                </div>
              </>
            );
          })}
          {isDeleteOpen ? (
            <>
              <div className="delete-course-confirmation-pop">
                <div className="delete-information-container">
                  <span className="delete-confirm-course-title">
                    Do you really want to delete?{" "}
                  </span>
                  <span>
                    <CloseIcon onClick={closeDeleteBtn} />
                  </span>
                </div>
                <i className="italics-confirm-delete">
                  Type course name to delete: {selectedCourse.courseName}
                </i>
                <input
                  className="rounded delete-confirm-course-matcher bg-slate-900"
                  placeholder="enter course name"
                  onChange={handleRechecker}
                  type="text"
                />
                <button
                  disabled={recheck ? false : true}
                  className="dashboard-delete-course-btn"
                  onClick={handleDeleteOnClick}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default DeleteDashboard;
