import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../HOCs/layout";
import {
  deleteMovie,
  fetchMovieDetail,
  fetchMovies,
} from "../../store/actions/movies";

const Movies = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isDeleteMovie, setIsDeleteMovie] = useState(false);

  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const moviesList = useSelector((state) => state.movies.moviesList);

  const me = useSelector((state) => state.auth.auth);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!me) props.history.push("/admin/login");
    else fetchMovies(dispatch, pageNumber, keyword);
    setIsDeleteMovie(false);
  }, [dispatch, pageNumber, keyword, isDeleteMovie, me, props.history]);

  const searchMovies = () => {
    setKeyword(values.keyword);
    setPageNumber(1);
  };

  const handleViewMovie = useCallback(
    (item) => {
      fetchMovieDetail(dispatch, item);
    },
    [dispatch]
  );

  const { handleBlur, handleChange, values } = useFormik({
    initialValues: {
      keyword: "",
    },
    validateOnMount: true,
  });

  const handleDeleteMovie = (maPhim) => {
    deleteMovie(maPhim, accessToken, props);
    setIsDeleteMovie(true);
  };

  const renderTableBody = () => {
    const tableBodyHTML = moviesList.map((item) => {
      return (
        <tr className="fs-6">
          <td>{moviesList.indexOf(item) + 1}</td>
          <td>{item.maPhim}</td>
          <td>{item.tenPhim}</td>
          <td>
            <i class="fa fa-star text-warning"></i> {item.danhGia}
          </td>
          <td>{item.maNhom}</td>
          <td>{item.ngayKhoiChieu.substr(0, 10)}</td>
          <td className="d-flex justify-content-around">
            <NavLink to={`/admin/moviedetail/${item.maPhim}`}>
              <button
                className="btn btn-dark text-warning"
                onClick={() => handleViewMovie(item)}
              >
                <i class="fa fa-search"></i>
              </button>
            </NavLink>
            <NavLink to={`/admin/updatemovie/${item.maPhim}`}>
              <button
                className="btn btn-dark text-primary"
                onClick={() => handleViewMovie(item)}
              >
                <i class="fa fa-edit fs-5"></i>
              </button>
            </NavLink>

            <button
              className="btn btn-dark text-danger"
              onClick={() => handleDeleteMovie(item.maPhim)}
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
            <span className="fs-2 fw-bolder">Movies</span>
          </div>
          <div className="col-9 row py-3">
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
                onClick={() => searchMovies()}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <NavLink to="/admin/insertmovie">
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT MOVIE <i class="fa fa-plus text-warning"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive col-12 container-fluid text-white">
        <table className="w-100 table table-dark table-borderless">
          <thead>
            <tr className="text-white-50 ">
              <th>NO.</th>
              <th>ID</th>
              <th>TITLE</th>
              <th>RATING</th>
              <th>GROUP ID</th>
              <th>SHOWTIMES</th>
              <th className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      <div className="paging row mb-3">
        <div className="paging__title col-3">
          <span className="fs-6 text-white-50">Movies List Information</span>
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
    </Layout>
  );
};

export default Movies;
