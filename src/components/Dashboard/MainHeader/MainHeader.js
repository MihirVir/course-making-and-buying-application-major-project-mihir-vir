import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import "./mainheader.css";
const MainHeader = ({ title }) => {
  return (
    <>
      <main className="dashboard-main-header bg-slate-800">
        <section className="dashboard-section-header">
          <div className="dashboard-header-container">
            <h2 className="dashboard-header-container-title text-xl font-bold text-neutral-100">
              {title}
            </h2>
            <span>
              <Link to="/">
                <HomeIcon className="return-home-icon" />
              </Link>
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainHeader;
