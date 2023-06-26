import React from "react";
import Layout from "../../HOCs/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { insertShowtime } from "../../store/actions/showtimes";

const schema = yup.object().shape({
  maPhim: yup.string().required("Enter movie id !"),
  maRap: yup.string().required("Enter cinema id !"),
  ngayChieuGioChieu: yup.string().required("Enter showtime !"),
  giaVe: yup
    .string()
    .required("Enter ticket price !")
    .matches(
      /^[7][5-9][0-9][0-9][0-9]|[8-9][0-9][0-9][0-9][0-9]|100000$/,
      "Ticket price must be between 75000 and 100000 !"
    ),
});

const InsertShowtime = (props) => {
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
      maPhim: Number(props.match.params.maPhim),
      maRap: "",
      ngayChieuGioChieu: "",
      giaVe: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      maPhim: true,
      maRap: true,
      ngayChieuGioChieu: true,
      giaVe: true,
    });

    if (!isValid) return;

    const data = { ...values };
  console.log(data);

    insertShowtime(accessToken, data, props);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Insert Showtime</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 row">
              <div className="col-12 col-md-6 my-2">
                <label className="text-warning mb-2">Movie ID: </label>
                <input
                  id="maPhim"
                  className="w-100 text-secondary bg-dark border border-warning p-2 "
                  value={values.maPhim}
                  disabled
                ></input>
                {touched.maPhim && (
                  <p className="text-danger m-auto">{errors.maPhim}</p>
                )}
              </div>

              <div className="col-12 col-md-6 my-2">
                <label className="text-warning mb-2">Cinema ID: </label>
                <input
                  id="maRap"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.maRap}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.maRap && (
                  <p className="text-danger m-auto">{errors.maRap}</p>
                )}
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-12 col-md-6 my-2">
                <label className="text-warning mb-2">
                  Showtime (dd/mm/yy hh:mm:ss):
                </label>
                <input
                  id="ngayChieuGioChieu"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.ngayChieuGioChieu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.ngayChieuGioChieu && (
                  <p className="text-danger m-auto">
                    {errors.ngayChieuGioChieu}
                  </p>
                )}
              </div>

              <div className="col-12 col-md-6 my-2">
                <label className="text-warning mb-2">
                  Ticket Price (vnd):{" "}
                </label>
                <input
                  id="giaVe"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.giaVe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.giaVe && (
                  <p className="text-danger m-auto">{errors.giaVe}</p>
                )}
              </div>
            </div>

            <div className="row">
              <button
                onClick={handleSubmit}
                className="col-3 btn btn-dark border border-warning border-2 p-2 mx-2 my-5"
              >
                Insert Showtime
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default InsertShowtime;
