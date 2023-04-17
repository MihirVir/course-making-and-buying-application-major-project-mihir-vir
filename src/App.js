import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/NavBar/Navbar";
import Register from "./components/Register/Register";
import CustomNav from "./components/CustomNav/CustomNav";
import CourseList from "./components/CourseList/CourseList";
import Home from "./components/Home/Home";
import VideoPage from "./components/VideoPage/VideoPage";
import { Provider } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import { store } from "./store";
import Search from "./components/Search/Search";
import VideoUploader from "./components/Dashboard/VideoUploader/VideoUploader";
import EditDashboard from "./components/Dashboard/EditDashboard/EditDashboard";
import Payment from "./components/Payment/Payment";
function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/course/:id" element={<CourseList />}></Route>
            <Route exact path="/custom" element={<CustomNav />}></Route>
            {/* searchroutes */}
            <Route exact path="/search" element={<Search />}></Route>
            <Route
              exact
              path="/course/:id/:videoIndex"
              element={<VideoPage />}
            ></Route>
            <Route exact path="/dashboard/:id" element={<Dashboard />}></Route>
            <Route
              exact
              path="/dashboard/upload/:id"
              element={<VideoUploader />}
            ></Route>
            <Route
              exact
              path="/dashboard/edit/:id"
              element={<EditDashboard />}
            ></Route>
            <Route exact path="/payment/:id" element={<Payment />}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
