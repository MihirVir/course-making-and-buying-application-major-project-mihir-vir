import React from "react";
import NavDash from "./NavDash/NavDash";
import MainHeader from "./MainHeader/MainHeader";
import Test from "./Test/Test";
import DeleteDashboard from "./DeleteDashboard/DeleteDashboard";
import "./dashboard.css";
import Stats from "./Stats/Stats";
import EditDashboard from "./EditDashboard/EditDashboard";
const Dashboard = () => {
  const id = document.URL.split("/")[4];

  return (
    <>
      <NavDash />
      <MainHeader title={id} />
      {(() => {
        switch (id) {
          case "statistics":
            return <Stats />;
          case "users":
            return <Test />;
          case "users/:id":
            return <Test />;
          case "delete":
            return <DeleteDashboard />;
          default:
            <MainHeader />;
        }
      })()}
    </>
  );
};

export default Dashboard;
