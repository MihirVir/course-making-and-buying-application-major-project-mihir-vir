import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Avatar, duration } from "@mui/material";
import { easeInOut, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch, Provider } from "react-redux";
import { selectSearch, setSearch } from "../../store";
import { URL } from "../../URL";
import "./custom.css";
import axios from "axios";
const CustomNav = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();
  const [isResultOpen, setResultOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  function handleOptionsClick() {
    setIsOptionsOpen(!isOptionsOpen);
  }

  const fetchData = async () => {
    const searchURL = `${URL}test/search?q=${search}`;
    const response = await axios.get(searchURL);
    setResults(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  console.log(results);
  useEffect(() => {
    if (search.length > 2) {
      setResultOpen(true);
    } else {
      setResultOpen(false);
    }
    fetchData();
  }, [search]);
  const handleDeleteAccount = () => {
    const url = `${URL}auth/`;
    const res = axios.delete(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log(res.data);
    navigate("/login");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search");
    console.log("navigation start");
  };
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <p className="site-heading-title">Major Project Mihir</p>
            </li>
            <li className="search-dept">
              <form onSubmit={handleSearch} className="search-text-form">
                <input
                  value={search}
                  autoComplete="false"
                  name="search"
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  className="search-inp"
                  type="text"
                  style={{ color: "black" }}
                  placeholder="type to search"
                />
                <button class="btn-is-real">Submit</button>
              </form>
              {isResultOpen && (
                <div className="search-results">
                  {isResultOpen && (
                    <Paper
                      className="paper-bg-results"
                      elevation={5}
                      sx={{ height: "25vh" }}
                    >
                      <div className="link-nav-holders">
                        {results.length > 0 ? (
                          results.map((item, idx) => {
                            return (
                              <>
                                <a href={`/course/${item._id}`}>
                                  {item.courseName}
                                </a>
                              </>
                            );
                          })
                        ) : (
                          <a href="#">No Results</a>
                        )}
                      </div>
                    </Paper>
                  )}
                </div>
              )}
            </li>
            {!JSON.parse(localStorage.getItem("token")) ? (
              <>
                <li>
                  <Link to="/login">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, easeInOut }}
                      className="nav-auth-btn"
                    >
                      Login
                    </motion.button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button className="nav-auth-btn">Sign Up</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, easeInOut }}
                    onClick={handleLogout}
                    className="nav-auth-btn"
                  >
                    Logout
                  </motion.button>
                </li>

                <li className="option-menu">
                  <MoreVertIcon onClick={handleOptionsClick} />
                  {isOptionsOpen && (
                    <div className="user-options-result">
                      <div className="paper-styling-options">
                        <div className="option-items-container">
                          <div className="avatar-and-username">
                            <Avatar
                              className="nav-avatar"
                              src="https://i.scdn.co/image/ab67616d0000b27324873164c69c38a8fe2d9730"
                            />
                            <span className="nav-username">Mihir</span>
                          </div>
                          <p className="options">
                            <Link to="/dashboard/users">Dashboard</Link>
                          </p>
                          <p onClick={handleDeleteAccount} className="options">
                            Delete Account
                          </p>
                          <Link to="/classroom" className="options">
                            Classroom
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default CustomNav;
