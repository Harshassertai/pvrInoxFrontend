import React from "react";
import Footer from "./components/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* <header className="header">
        <h1>My Dashboard</h1>
      </header> */}
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
