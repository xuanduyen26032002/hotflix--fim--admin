import React from "react";
import Layout from "../../HOCs/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateUser } from "../../store/actions/users";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Enter username !"),
  matKhau: yup.string().required("Enter password !"),
  email: yup.string().required("Enter email !").email("Enter email !"),
  soDt: yup
    .string()
    .required("Enter phone number !")
    .matches(/^[0-9]+$/g, "Enter phone number !"),
  maNhom: yup.string().required("Enter group id !"),
  maLoaiNguoiDung: yup.string().required("Enter type of user !"),
  hoTen: yup.string().required("Enter name !"),
});

const UpdateUser = (props) => {
  const accessToken = localStorage.getItem("accessToken");

  const userDetail = useSelector((state) => state.users.userDetail) || {};

  const {
    isValid,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setTouched,
  } = useFormik({
    initialValues: {
      taiKhoan: userDetail.taiKhoan,
      matKhau: userDetail.matKhau,
      email: userDetail.email,
      soDt: userDetail.soDt,
      maNhom: userDetail.maNhom ? userDetail.maNhom : "GP01",
      maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
      hoTen: userDetail.hoTen,
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      taiKhoan: true,
      matKhau: true,
      email: true,
      soDt: true,
      maNhom: true,
      maLoaiNguoiDung: true,
      hoTen: true,
    });

    if (!isValid) return;

    const newData = { ...values };

    updateUser(newData, accessToken, props);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Update user</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 col-md-6 my-2">
              <label className="text-warning mb-2">Username: </label>
              <input
                id="taiKhoan"
                className="w-100 text-white bg-dark bg-opacity-50 border border-warning p-2 "
                value={values.taiKhoan}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              ></input>
              {touched.taiKhoan && (
                <p className="text-danger m-auto">{errors.taiKhoan}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className="text-warning mb-2">Password: </label>
              <input
                id="matKhau"
                className="w-100 text-white bg-dark bg-opacity-50 border border-warning p-2 "
                value={values.matKhau}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.matKhau && (
                <p className="text-danger">{errors.matKhau}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className="text-warning mb-2">Name: </label>
              <input
                id="hoTen"
                className="col-6 w-100 text-white bg-dark bg-opacity-50 border border-warning p-2 "
                value={values.hoTen}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.hoTen && <p className="text-danger">{errors.hoTen}</p>}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className="text-warning mb-2">Group ID: </label>
              <input
                id="maNhom"
                className="col-6 w-100 text-white bg-dark bg-opacity-50 border border-warning p-2 "
                value={values.maNhom}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.maNhom && <p className="text-danger">{errors.maNhom}</p>}
            </div>

            <div className="col-12 col-md-6 my-2">
              <label className="text-warning mb-2">Phone Number: </label>
              <input
                id="soDt"
                className="col-6 w-100 text-white bg-dark bg-opacity-50 border border-warning p-2 "
                value={values.soDt}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.soDt && <p className="text-danger">{errors.soDt}</p>}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className="text-warning mb-2">Email: </label>
              <input
                id="email"
                className="col-6 w-100 text-white bg-dark bg-opacity-50 border border-warning p-2 "
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="col-12 col-md-6 my-2 d-flex justify-content-around">
              <label className="text-warning">Type Of User: </label>
              <select
                id="maLoaiNguoiDung"
                value={values.maLoaiNguoiDung}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-100 p-2 bg-dark text-white border border-warning"
              >
                <option value="KhachHang">Khách Hàng</option>
                <option value="QuanTri">Quản Trị</option>
              </select>
            </div>

            <div className="row">
              <button
                onClick={handleSubmit}
                className="col-3 btn btn-dark border border-warning border-2 p-2 mx-2 my-5"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUser;
