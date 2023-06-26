import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/actions/auth";
import { NavLink } from "react-router-dom";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Enter your username !"),
  matKhau: yup.string().required("Enter your password !"),
});

const LogIn = (props) => {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.auth.auth);

  useEffect(() => {
    if (me) props.history.push("/admin");
  }, [me, props.history]);

  const {
    isValid,
    setTouched,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      taiKhoan: true,
      matKhau: true,
    });

    if (!isValid) return;

    const account = { ...values };

    logIn(dispatch, account);
  };

  return (
    <div>
      <div className="container-fluid bg-dark sticky-top vh-100">
        <div
          className="row m-auto d-flex justify-content-center "
          style={{ maxWidth: "400px" }}
        >
          <form className="col-12 bg-dark bg-gradient rounded w-100 my-5">
            <NavLink
              to="/admin"
              className=" fs-1 fw-bold mb-5 text-center d-block mt-3 text-decoration-none"
            >
              <span className="text-warning">HOT</span>
              <span className="text-white">FLIX</span>
            </NavLink>

            <label className="text-warning fs-5">Username</label>
            <input
              id="taiKhoan"
              label="Username"
              value={values.taiKhoan}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              className="w-100 my-3 bg-secondary border border-warning p-2"
            ></input>
            {touched.taiKhoan && (
              <p className="text-danger">{errors.taiKhoan}</p>
            )}

            <label className="text-warning fs-5">Password</label>
            <input
              id="matKhau"
              label="Password"
              value={values.matKhau}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-100 my-3 bg-secondary border border-warning p-2"
            ></input>
            {touched.matKhau && <p className="text-danger">{errors.matKhau}</p>}

            <button
              type="submit"
              className="btn btn-dark border border-warning w-100 text-white my-3 fs-5"
              onClick={handleSubmit}
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
