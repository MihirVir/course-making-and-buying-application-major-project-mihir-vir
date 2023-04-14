import axios from "axios";
import React, { useState, useEffect } from "react";
import { URL } from "../../../URL";
import "./users.css";
const Users = () => {
  const [response, setResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const url = `http://localhost:8000/admin/users/${currentPage}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setResponse(res.data);
      setIsLoading(false);
      if (res.status != 200 || currentPage > res.data.pages) {
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const items = [];

  const handlePageChange = (idx) => {
    setCurrentPage(idx);
  };
  for (let i = 1; i <= response.pages; i++) {
    items.push(
      <li
        className={currentPage === i ? "active" : ""}
        onClick={() => handlePageChange(i)}
        key={i}
      >
        {i}
      </li>
    );
  }
  return (
    <>
      {isError ? (
        <>
          <section className="dashboard-users-page bg-slate-800">
            <h1 className="text-white">ERROR OCCURREDDD</h1>
          </section>
        </>
      ) : (
        <>
          <section className="dashboard-users-page bg-slate-800">
            <div className="dashboard-users-page-container border-slate-700">
              <table className="dashboard-users-page-table">
                <thead className="text-left text-white">
                  <th>Sno</th>
                  <th>username</th>
                  <th>email</th>
                  <th>coursename</th>
                  <th>year joined</th>
                </thead>
                <tbody className="text-white ">
                  {response?.users?.map((item, idx) => {
                    return (
                      <>
                        <tr key={idx}>
                          <td>{parseInt(idx + 1)}</td>
                          <td>{item?.customer.username}</td>
                          <td>{item?.customer.email}</td>
                          <td>{item?.coursesPurchased?.courseName}</td>
                          <td>2023</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
              <div className="user-dashboard-page-list">
                <ul className="user-dashboard-page-ul">{items}</ul>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Users;
