import React, { useState, useEffect } from "react";
import { Paper, Rating } from "@mui/material";
import "./coursetitle.css";
import { URL } from "../../../URL";
import axios from "axios";
const CourseTitle = ({ courseDetails, isLoading, courseId }) => {
  const [coupon, setCoupon] = useState("");
  const [couponMode, setCouponMode] = useState(false);
  function openCouponCodeEnter() {
    setCouponMode((prev) => !prev);
  }
  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };
  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const url = `${URL}newer/${courseId}`;
      const res = await axios.post(
        url,
        { coupon: coupon },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      setCouponMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="specific-course-details">
        {isLoading ? (
          <>
            <h1>Loading</h1>
          </>
        ) : (
          <>
            <div className="specific-course-details-first-col">
              <h4 className="course-name-title">
                {courseDetails.courseName || "error finding the course"}
              </h4>
              <p className="short-desc-course">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus sunt aperiam dolorem cupiditate corrupti! Eligendi
                temporibus nostrum et quos porro.
              </p>
              <div className="rating">
                <span className="rating-text"></span>
                <Rating
                  sx={{ filter: "invert(100);", color: "#000" }}
                  name="read-only"
                  value={courseDetails.rating || 0}
                  readOnly
                />
              </div>
              <p className="course-language">English</p>
              <div className="developed-by">
                <span className="created-by">Created by:</span>
                <span className="developers-username">
                  {courseDetails.author.username}
                </span>
              </div>
            </div>
            <div
              className="specific-course-paper"
              sx={{ height: "62vh", width: "28vw" }}
              elevation={4}
            >
              <img
                className="specific-course-img"
                src={`${URL}templates/${courseDetails.template}`}
                alt="no img avaiable"
              />
              <div className="specific-course-item-details">
                <ul className="fixed-pos-li">
                  <li>
                    <h4>${courseDetails.price}</h4>
                  </li>
                  <li className="policy">10-Day Money-Back Guarantee</li>
                  <li className="policy">Full Lifetime Access</li>
                  <li className="buy-btn-container">
                    <button onClick={openCouponCodeEnter} className="buy-btn">
                      Buy this course
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
        {couponMode && (
          <>
            <div className="coupon-handler">
              <form className="coupon-form-handler" onSubmit={handlePurchase}>
                <h1 className="title-purchase">Purchase Code</h1>
                <span
                  onClick={() => setCouponMode(false)}
                  className="closing-tag"
                >
                  Close
                </span>
                <input
                  onChange={handleCoupon}
                  className="text-field-for-coupon bg-slate-900 rounded"
                  type="text"
                  placeholder="enter coupon code to purchase the course"
                />
                <button
                  className="submit-purchase-btn hover:bg-neutral-900"
                  type="submit"
                >
                  Enter to purchase
                </button>
              </form>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CourseTitle;
