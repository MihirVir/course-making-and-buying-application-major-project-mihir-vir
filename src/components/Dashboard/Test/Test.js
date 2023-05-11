import React, { useRef, useState } from "react";
import { useReducer } from "react";
import {
  UPLOAD_INITIAL_STATE,
  dashboardUploadReducer,
} from "../../../reducers/dashboardUploadReducer";
import axios from "axios";
import { URL } from "../../../URL";
import { useNavigate } from "react-router-dom";
import "./test.css";
const Test = () => {
  const radioBtn = useRef();
  const [result, setResult] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [file, setFile] = useState();
  const [state, dispatch] = useReducer(
    dashboardUploadReducer,
    UPLOAD_INITIAL_STATE
  );
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const filer = e.target.files[0];

    setFile(filer);
  };

  const handleChecked = () => {
    setIsPrivate(!isPrivate);
    if (isPrivate) {
      radioBtn.current.checked = true;
    } else {
      radioBtn.current.checked = false;
    }
  };

  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("courseName", state.courseName);
    data.append("price", state.price);
    data.append("template", file);
    data.append("security", isPrivate);
    data.append("tags", state.tags);
    data.append("title", state.title);
    data.append("coupon", state.coupon);
    const res = await axios.post(`${URL}test/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log(res);
    setResult(res);
    if (res.status === 201) {
      navigate(`/dashboard/upload/${res.data}`);
    }
  };
  console.log("end result after submit", result);
  // console.log("result", result);
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  return (
    <>
      <main className="main-section-information bg-slate-800">
        <section className="dashboard-section-information">
          <div className="dashboard-section-information-container">
            <div className="dashboard-course-uploader-card bg-slate-600">
              <h4 className="information-section-title text-white">Upload</h4>
              <form
                onSubmit={handleSubmit}
                className="dashboard-form-uploader-course"
              >
                <label className="text-white mb-1">Course Name</label>
                <input
                  name="courseName"
                  onChange={handleChange}
                  className="dashboard-input-course-upload bg-gray-900 text-white mb-2"
                  type="text"
                  placeholder="enter course name"
                />

                <label className="mt-2 text-white mb-1">Price</label>

                <input
                  name="price"
                  onChange={handleChange}
                  className="mb-2 dashboard-input-course-upload bg-gray-900 text-white"
                  placeholder="enter price of the course in numbers"
                  type="text"
                />

                <label
                  class="block mb-2 text-sm font-medium text-gray-900 mt-2 dark:text-white"
                  for="file_input"
                >
                  Upload file
                </label>
                <input
                  name="template"
                  onChange={handleImageChange}
                  className="p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-200 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                />

                <p
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  PNG, JPG
                </p>

                <label className="mb-1 text-white mt-2">Privacy</label>
                <div class="flex items-center">
                  <input
                    onChange={handleChange}
                    ref={radioBtn}
                    onClick={handleChecked}
                    id="default-radio-2"
                    type="radio"
                    value={isPrivate}
                    name="security"
                    class="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label class="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                    Private
                  </label>
                </div>
                <label className="text-white mb-1 mt-2">Tags</label>
                <input
                  name="tags"
                  onChange={handleChange}
                  className="mb-2 dashboard-input-course-upload text-white bg-gray-900"
                  type="text"
                  placeholder="enter tags eg: Java,JavaScript"
                />
                <label className="text-white mb-1">Title</label>
                <input
                  name="title"
                  onChange={handleChange}
                  className="text-white mb-2 dashboard-input-course-upload bg-gray-900"
                  type="text"
                  placeholder="Enter video titles like Introduction to Java,Starting Classes,Using Inheritance..."
                />
                <label className="text-white">Coupon Code</label>
                <input
                  type="text"
                  name="coupon"
                  onChange={handleChange}
                  placeholder="enter your coupon code for purchasing this course"
                  className="text-white mb-2 dashboard-input-course-upload bg-gray-900"
                />
                <button
                  className="bg-sky-300 mt-3 h-10 hover:bg-sky-500 rounded-sm"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;
