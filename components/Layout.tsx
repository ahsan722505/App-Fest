import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import MobileNavbar from "../MobileNavbar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      {/* <MobileNavbar /> */}
      <main className="min-h-[85vh] max-w-[1200px] mx-auto">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
