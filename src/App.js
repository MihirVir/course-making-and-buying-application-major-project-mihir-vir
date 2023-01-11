
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
import Home from './components/Home/Home';
function App() {
  return (
    <>
    <Navbar/>
      <Router>
          <Routes>
            <Route exact path = "/login" element = {<Login/>} ></Route>
            <Route exact path = "/register" element = {<Register />}></Route> 
            <Route exact path = "/" element = {<Home />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
