import React, { useEffect, useState } from "react";
// import Slider from "./Slider/Slider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";
import NewCourse from "./fetchCourses/NewCourse";
import NewTestPage from "./NewTestPage/NewTestPage";
import Navbar from "../NavBar/Navbar";
import CustomNav from "../CustomNav/CustomNav";
import ContactPage from "./ContactPage/ContactPage";
import Footer from "../Footer/Footer";
const Home = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState([]);
  function getCookie(name) {
    const cookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith(`${name}=`));
    if (!cookie) {
      return null;
    }

    return cookie.split("=")[1];
  }
  const accessToken = getCookie("access_token");
  console.log(accessToken);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigate("/login");
    }
  }, []);

  const fetchResults = async () => {};
  return (
    <>
      <CustomNav />
      <section className="home-section bg-slate-700">
        <NewTestPage />
        <NewCourse accessToken={accessToken} />
        <ContactPage />
        <Footer />
      </section>
    </>
  );
};

export default Home;
