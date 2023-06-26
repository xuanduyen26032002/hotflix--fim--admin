import React from "react";
import Layout from "../../HOCs/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { insertUser } from "../../store/actions/users";

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

const InsertUser = (props) => {
  const accessToken = localStorage.getItem("accessToken");

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
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
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

    const newUser = { ...values };
    console.log("data: " + newUser);

    insertUser(newUser, accessToken, props);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Add new user</span>
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
                placeholder="Username"
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
                placeholder="Password"
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
                placeholder="Name"
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
                placeholder="Group ID"
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
                placeholder="Phone Number"
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
                placeholder="Email"
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
                Insert User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default InsertUser;
