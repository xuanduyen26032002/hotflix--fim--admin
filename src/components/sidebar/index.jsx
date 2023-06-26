import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../store/actions/auth";

const Sidebar = (props) => {
  const me = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    logOut(dispatch);
  };

  return (
    <div className="p-3  container">
      <div className="row d-flex justify-content-between">
        <div className="row col-12 col-lg-12">
          <div className="col-12 col-lg-12 fs-1 fw-bolder mb-5 text-center">
            <span className="text-warning">HOT</span>
            <span>FLIX</span>
          </div>

          <div className="col-12 col-lg-12  mb-5 d-flex justify-content-between">
            <i class=" fa fa-user fs-3 p-2"></i>
            <div className="">
              <span className="d-block fs-6">Admin</span>
              {me ? (
                <span className="fw-bold text-warning">{me.hoTen}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              {me ? (
                <NavLink to="/admin/login">
                  <button
                    className="btn btn-dark border border-warning border-2 p-2"
                    onClick={() => handleLogOut()}
                  >
                    <i class="fa fa-sign-in-alt"></i>
                  </button>
                </NavLink>
              ) : (
                <NavLink to="/admin/login">
                  <button className="btn btn-dark border border-warning border-2 p-2">
                    <i class="fa fa-sign-in-alt"></i>
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
        <div className="row col-12 col-lg-12 bg-transparent">
          <ul className="list-group row mx-auto">
            <li className="col-12 list-group-item bg-transparent">
              <NavLink to="/admin" className=" text-decoration-none text-white">
                <i class="fa fa-th-list pe-2 text-warning fs-4 px-1"></i>
                DASHBOARD
              </NavLink>
            </li>
            <li className="col-12 list-group-item bg-transparent">
              <NavLink
                to="/admin/users"
                className=" text-white text-decoration-none"
              >
                <i class="fa fa-users pe-2 text-warning fs-4"></i>
                USERS
              </NavLink>
            </li>
            <li className="col-12 list-group-item bg-transparent">
              <NavLink
                to="/admin/movies"
                className=" text-white text-decoration-none"
              >
                <i class="fa fa-film pe-2 text-warning fs-4 px-1"></i>
                MOVIES
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
