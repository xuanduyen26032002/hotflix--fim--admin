import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../HOCs/layout";
import { deleteUser, fetchUsers } from "../../store/actions/users";
import { fetchUserDetail } from "../../store/actions/users";

const Users = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.users.usersList);

  const me = useSelector((state) => state.auth.auth);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!me) props.history.push("/admin/login");
    fetchUsers(dispatch, pageNumber, keyword);
    setIsDeleteUser(false);
  }, [dispatch, pageNumber, keyword, isDeleteUser, me, props.history]);

  const searchUsers = () => {
    setKeyword(values.keyword);
    setPageNumber(1);
  };

  const handleChangeUserDetail = (item) => {
    fetchUserDetail(dispatch, item);
  };

  const { handleBlur, handleChange, values } = useFormik({
    initialValues: {
      keyword: "",
    },
    validateOnMount: true,
  });

  const handleDeleteUser = (taiKhoan) => {
    deleteUser(taiKhoan, accessToken);
    setIsDeleteUser(true);
  };

  const renderTableBody = () => {
    const tableBodyHTML = usersList.map((item) => {
      return (
        <tr className="fs-6">
          <td>{usersList.indexOf(item) + 1}</td>
          <td>
            <i class="fa fa-user fs-6 p-2 border border-warning"></i>{" "}
            {item.hoTen}
          </td>
          <td>{item.taiKhoan}</td>
          <td>{item.soDt}</td>
          <td>{item.email}</td>
          <td>{item.maLoaiNguoiDung}</td>
          <td className="d-flex justify-content-around">
            <NavLink to="/admin/updateuser">
              <button
                className="btn btn-dark text-primary "
                onClick={() => handleChangeUserDetail(item)}
              >
                <i class="fa fa-edit fs-5"></i>
              </button>
            </NavLink>
            <button
              className="btn btn-dark text-danger"
              onClick={() => handleDeleteUser(item.taiKhoan)}
            >
              <i class="fa fa-trash fs-5"></i>
            </button>
          </td>
        </tr>
      );
    });

    return tableBodyHTML;
  };

  return (
    <Layout>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-3 py-3">
            <span className="fs-2 fw-bolder">Users</span>
          </div>
          <div className="col-9 row py-3 ">
            <div className="col-12 col-md-6 d-flex justify-content-end">
              <input
                id="keyword"
                className="w-100 text-white bg-dark border border-warning border-2 px-2"
                placeholder="Enter Keyword"
                value={values.keyword}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>

              <button
                className="btn btn-dark border border-warning border-2 ms-2"
                onClick={() => searchUsers()}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <NavLink to="/admin/insertuser">
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT USER <i class="fa fa-plus text-warning"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="table-responsive col-12 container-fluid text-white">
          <table className="w-100 table table-dark table-borderless">
            <thead>
              <tr className="text-white-50 ">
                <th>NO.</th>
                <th>BASIC INFO</th>
                <th>USERNAME</th>
                <th>PHONE NUMBER</th>
                <th>EMAIL</th>
                <th>USER TYPE</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>

        <div className="paging row mb-3">
          <div className="paging__title col-3">
            <span className="fs-6 text-white-50">Users List Information</span>
          </div>

          <div className="paging__bar col-9 d-flex justify-content-end">
            {pageNumber === 1 ? (
              <button disabled className="btn btn-dark px-3">
                <i class="fa fa-ban"></i>
              </button>
            ) : (
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                className="btn btn-dark px-3"
              >
                <i class="fa fa-angle-left"></i>
              </button>
            )}
            <button className="btn btn-dark border border-warning px-3">
              {pageNumber}
            </button>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              className="btn btn-dark px-3"
            >
              <i class="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
