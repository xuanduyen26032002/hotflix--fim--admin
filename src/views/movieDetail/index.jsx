import React from "react";
import {  useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../HOCs/layout";

const MovieDetail = (props) => {
  const movieDetail = useSelector((state) => {
    return state.movies.movieDetail || null;
  });

  const maPhim = props.match.params.maPhim;

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="row py-3 col-3">
            <span className="fs-2 fw-bolder">Movie Detail</span>
          </div>
          <div className="py-3 col-9 d-flex justify-content-end">
            <NavLink to={`/admin/showtimes/${maPhim}`}>
              <button className="btn btn-dark border border-warning border-2 p-2">
                SHOWTIMES <i class="fa fa-search text-warning"></i>
              </button>
            </NavLink>
          </div>
        </div>

        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 col-md-4">
              <img alt="hinhAnh" src={movieDetail.hinhAnh} className="w-100 my-4"></img>
            </div>
            <div className="col-12 col-md-8 row">
              <div className="col-12 row">
                <div className="col-6 my-2">
                  <label className="text-warning mb-2">Movie ID: </label>
                  <input
                    id="maPhim"
                    className="w-100 text-white bg-dark border border-warning p-2 "
                    value={movieDetail.maPhim}
                    disabled
                  ></input>
                </div>
                <div className="col-6 my-2 ">
                  <label className="text-warning mb-2 ">Group ID: </label>
                  <input
                    id="maNhom"
                    className="w-100 text-white bg-dark border border-warning p-2 "
                    value={movieDetail.maNhom}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Title: </label>
                <input
                  id="tenPhim"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={movieDetail.tenPhim}
                  disabled
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Aliases: </label>
                <input
                  id="biDanh"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={movieDetail.biDanh}
                  disabled
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className="text-warning mb-2">Decription: </label>
                <textarea
                  id="moTa"
                  className="w-100 text-white bg-dark border border-warning p-2 "
                  value={movieDetail.moTa}
                  disabled
                ></textarea>
              </div>
              <div className="col-12 row my-2">
                <div className="col-4 py-2">
                  <span className="text-warning">Rating: </span>
                  <span>
                    {movieDetail.danhGia}
                    <i class="fa fa-star text-warning mx-2"></i>
                  </span>
                </div>
                <div className="col-8 d-flex justify-content-between">
                  <label className="text-warning p-2">Showtime: </label>
                  <input
                    id="ngayKhoiChieu"
                    className="w-100 text-white bg-dark border border-warning "
                    value={movieDetail.ngayKhoiChieu.substr(0, 10)}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-12">
                <iframe
                  src={movieDetail.trailer}
                  title="trailer"
                  className="w-100 vh-100"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;
