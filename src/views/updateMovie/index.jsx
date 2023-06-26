import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../HOCs/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateMovie } from "../../store/actions/movies";

const schema = yup.object().shape({
  hinhAnh: yup.string().required("Enter image source !"),
  maPhim: yup.string().required("Enter movie id !"),
  maNhom: yup.string().required("Enter group id !"),
  tenPhim: yup.string().required("Enter movie name !"),
  biDanh: yup.string().required("Enter movie aliases !"),
  moTa: yup.string().required("Enter decription !"),
  danhGia: yup.string().required("Enter rating !"),
  ngayKhoiChieu: yup.string().required("Enter showtime !"),
  trailer: yup.string().required("Enter trailer !"),
});

const UpdateMovie = (props) => {
  const movieDetail = useSelector((state) => {
    return state.movies.movieDetail || null;
  });

  const accessToken = localStorage.getItem("accessToken");
  const ngayChieu = movieDetail.ngayKhoiChieu.substr(0, 10);

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
      hinhAnh: movieDetail.hinhAnh,
      maPhim: movieDetail.maPhim,
      maNhom: movieDetail.maNhom,
      tenPhim: movieDetail.tenPhim,
      biDanh: movieDetail.biDanh,
      moTa: movieDetail.moTa,
      danhGia: movieDetail.danhGia,
      ngayKhoiChieu:
        ngayChieu.substr(8, 2) +
        "-" +
        ngayChieu.substr(5, 2) +
        "-" +
        ngayChieu.substr(0, 4),

      trailer: movieDetail.trailer,
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      hinhAnh: true,
      maPhim: true,
      maNhom: true,
      tenPhim: true,
      biDanh: true,
      moTa: true,
      danhGia: true,
      trailer: true,
    });

    if (!isValid) return;

    const newData = { ...values };

    updateMovie(newData, accessToken, props);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Update Movie</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 col-md-4 my-2">
              <label className="text-warning mb-2">Image Source: </label>
              <input
                id="hinhAnh"
                className="w-100 text-white bg-dark border border-warning p-2 "
                value={values.hinhAnh}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.hinhAnh && (
                <p className="text-danger m-auto">{errors.hinhAnh}</p>
              )}
              <img
                alt="hinhAnh"
                src={values.hinhAnh}
                className="w-100 my-4"
              ></img>
            </div>
            <div className="col-12 col-md-8 row">
              <div className="col-12 row">
                <div className="col-6 my-2">
                  <label className="text-warning mb-2">Movie ID: </label>
                  <input
                    id="maPhim"
                    className="w-100 text-white bg-dark border border-warning p-2 "
                    value={values.maPhim}
                    disabled
                  ></input>
                  {touched.maPhim && (
                    <p className="text-danger m-auto">{errors.maPhim}</p>
                  )}
                </div>
                <div className="col-6 my-2">
                  <label className="text-warning mb-2">Group ID: </label>
                  <input
                    id="maNhom"
                    className="w-100 text-white bg-dark border border-warning p-2 "
                    value={values.maNhom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {touched.maNhom && (
                    <p className="text-danger m-auto">{errors.maNhom}</p>
                  )}
                </div>
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Title: </label>
                <input
                  id="tenPhim"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.tenPhim}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.tenPhim && (
                  <p className="text-danger m-auto">{errors.tenPhim}</p>
                )}
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Aliases: </label>
                <input
                  id="biDanh"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.biDanh}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.biDanh && (
                  <p className="text-danger m-auto">{errors.biDanh}</p>
                )}
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Decription: </label>
                <textarea
                  id="moTa"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.moTa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {touched.moTa && (
                  <p className="text-danger m-auto">{errors.moTa}</p>
                )}
              </div>
              <div className="col-12 row my-2">
                <div className="col-4 py-2">
                  <span className="text-warning">Rating: </span>
                  <select
                    id="danhGia"
                    value={values.danhGia}
                    className="text-white bg-dark border border-warning p-2"
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <span>
                    <i class="fa fa-star text-warning px-2"></i>
                  </span>
                </div>
                <div className="col-8 d-flex justify-content-between">
                  <label className="text-warning p-2 ">Showtime: </label>
                  <input
                    id="ngayKhoiChieu"
                    className="w-100 text-white bg-dark border border-warning "
                    value={values.ngayKhoiChieu}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {touched.ngayKhoiChieu && (
                    <p className="text-danger m-auto">{errors.ngayKhoiChieu}</p>
                  )}
                </div>
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Trailer: </label>
                <input
                  id="trailer"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={values.trailer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.trailer && (
                  <p className="text-danger m-auto">{errors.trailer}</p>
                )}
              </div>
            </div>

            <div className="row">
              <button
                onClick={handleSubmit}
                className="col-3 btn btn-dark border border-warning border-2 p-2 mx-2 my-5"
              >
                Update Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateMovie;
