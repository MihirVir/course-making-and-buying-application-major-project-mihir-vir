import React, { useState } from "react";
import "./videonext.css";
import { Link } from "react-router-dom";
const VideoNext = ({ len, courseId }) => {
  const id = parseInt(document.URL.split("/")[5]) + 1;
  const [counterId, setCounterId] = useState(id);

  const handleDecrementLogic = () => {
    setCounterId((prevState) => prevState - 1);
  };
  const handleIncrementLogic = () => {
    setCounterId((prevState) => prevState + 1);
  };
  return (
    <>
      <section className="video-next-section bg-black text-white ">
        <div className="video-next-container">
          <div className="next-video">
            {id > 1 && (
              <>
                <Link
                  className="bg-white text-black p-1 hover:text-slate-900"
                  onClick={handleDecrementLogic}
                  reloadDocument="true"
                  to={`/course/${courseId}/${counterId}`}
                >
                  Previous Video
                </Link>
              </>
            )}
          </div>
          <div>
            <h4 className="bg-black text-center text-white ">
              Thanks for using the application developed by Mihir
            </h4>
          </div>
          <div className="next-video ">
            {id < len && (
              <>
                <Link
                  onClick={handleIncrementLogic}
                  reloadDocument="true"
                  className="bg-white text-black p-1 hover:text-slate-900"
                  to={`/course/${courseId}/${counterId}`}
                >
                  Next Video
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoNext;
