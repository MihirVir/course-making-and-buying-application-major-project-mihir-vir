
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Login from './components/Login/Login';
import Navbar from './components/NavBar/Navbar';
import Register from './components/Register/Register'
import CustomNav from './components/CustomNav/CustomNav';
import CourseList from './components/CourseList/CourseList';
import Home from './components/Home/Home';
import VideoPage from './components/VideoPage/VideoPage';
function App() {
  return (
    <>
    {/* <Navbar/> */}
      <Router>
          <Routes>
            <Route exact path = "/login" element = {<Login />} ></Route>
            <Route exact path = "/register" element = {<Register />}></Route> 
            <Route exact path = "/" element = {<Home />}></Route>
            <Route exact path = "/course/:id" element = {<CourseList />}></Route>
            <Route exact path = "/custom" element = {<CustomNav />}></Route>
            <Route exact path = "/course/:id/:videoIndex" element = {<VideoPage/>}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
