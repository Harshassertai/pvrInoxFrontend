import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingSpinner from "./components/Common/FallBackLoading/LoadingSpinner";
import Layout from "./Layout";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Users from "./components/Users/User";
import Support from "./components/Support/Support";
import TAT from "./components/Dock/TAT";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NewAlertsPage from "./components/Alerts/NewAlertsPage";
import BarClickTable from "./components/Table/BarClickTable";
import BarClickTableForUsersAssigned from "./components/Table/BarClickTableForUsersAssigned";
import Bypasscamera from "./components/ByPassCamera/Bypasscamera";
import CountsTable from "./components/Table/CountsTable";
import Unauthorized from "./components/Notifications/404/Unauthorized";
import TimeLine from "./components/TimeLine/TimeLine";

function App() {
  const [accessValue, setAccessValue] = useState("");
  const [mouseMove, setMouseMove] = useState("");
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

  const recordUserActivity = () => {
    const myCookieValue = Cookies.get("name");
    console.log("My Cookie Value:", myCookieValue);
  };

  useEffect(() => {
    // Function to clear complete cache data
    clearCacheData();
    recordUserActivity();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          {/* <Route path="/home" element={<Dashboard />} /> */}
          <Route exact path="/" element={<Login />} />
          {/* <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} /> */}
          <Route exact path="/users" element={<Users />} />
          {/* <Route exact path="/alerts" element={<NewAlertsPage />} />
          <Route exact path="/support" element={<Support />} />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          <Route exact path="/tat" element={<TAT />} />
          <Route exact path="/bargraphclick" element={<BarClickTable />} />
          <Route
            exact
            path="/bargraphclickforusersassigned"
            element={<BarClickTableForUsersAssigned />}
          />
          <Route exact path="/bypasscamera" element={<Bypasscamera />} />
          <Route exact path="/countsTable" element={<CountsTable />} />
          <Route exact path="/timeline" element={<TimeLine />} /> */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
