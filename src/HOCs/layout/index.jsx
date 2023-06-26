import React from "react";
import Sidebar from "../../components/sidebar";

const Layout = (props) => {
  return (
    <div className="container-fluid  text-white h-100">
      <div className="row">
        <div className="col-12 col-lg-3 col-xl-2 bg-dark">
          <Sidebar />
        </div>
        <div className="col-12 col-lg-9 col-xl-10 bg-dark">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
