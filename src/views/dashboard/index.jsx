import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../HOCs/layout";
import { fetchAllMovies } from "../../store/actions/movies";
import { fetchAllUsers } from "../../store/actions/users";

const Dashboard = (props) => {
  const me = useSelector((state) => state.auth.auth);

  const allMovies = useSelector((state) => state.movies.moviesList) || null;

  const allUsers = useSelector((state) => state.users.usersList) || null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) props.history.push("/admin/login");

    fetchAllMovies(dispatch);
    fetchAllUsers(dispatch);
  }, []);

  const findLastestMovies = (lastestMovies) => {
    for (let i = 0; i < 10; i++) {
      lastestMovies.push(allMovies[i]);
    }
  };

  const fetchLastestMovies = () => {
    const lastestMovies = [];

    findLastestMovies(lastestMovies);

    const lastestMoviesHTML = lastestMovies.map((movie) => {
      if (movie === undefined) {
        return;
      } else
        return (
          <tr>
            <td>{movie.maPhim}</td>
            <td>{movie.tenPhim}</td>
            <td>
              {movie.danhGia} <i class="fa fa-star text-warning"></i>
            </td>
          </tr>
        );
    });

    return lastestMoviesHTML;
  };

  const findLastestUsers = (lastestUsers) => {
    for (let i = 0; i < 10; i++) {
      lastestUsers.push(allUsers[i]);
    }
  };

  const fetchLastestUsers = () => {
    const lastestUsers = [];
    findLastestUsers(lastestUsers);

    const lastestUsersHTML = lastestUsers.map((user) => {
      if (user === undefined) {
        return;
      } else
        return (
          <tr>
            <td>
              <i class="fa fa-user text-warning me-3"></i>
              {user.taiKhoan}
            </td>
            <td>{user.hoTen}</td>
          </tr>
        );
    });

    return lastestUsersHTML;
  };

  return (
    <Layout>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12 py-3">
            <span className="fs-2 fw-bolder">Dashboard</span>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row bg-dark bg-gradient rounded mx-auto px-4 py-2 mt-3">
              <div className="col-12 col-sm-9">
                <span className="fs-6">Movies Total</span>
                <br />
                <span className="text-warning fs-2">{allMovies.length}</span>
              </div>
              <div className="col-12 col-sm-3 text-warning d-flex justify-content-center m-auto">
                <i class="fa fa-film fs-1 fw-bolder"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row bg-dark bg-gradient rounded mx-auto px-4 py-2 mt-3">
              <div className="col-12 col-sm-9">
                <span className="fs-6">Users Total</span>
                <br />
                <span className="text-warning fs-2">{allUsers.length}</span>
              </div>
              <div className="col-12 col-sm-3 text-warning d-flex justify-content-center m-auto">
                <i class="fa fa-users fs-1 fw-bolder"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 my-5">
            <span className="fw-bolder fs-5">
              <i class="fa fa-award text-warning px-4 fs-3"></i>
              Lastest Movies
            </span>

            <div className="table col-12 container-fluid text-white my-2">
              <table className="w-100 table table-dark table-borderless">
                <thead>
                  <tr className="text-white-50 ">
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>RATING</th>
                  </tr>
                </thead>
                <tbody>{fetchLastestMovies()}</tbody>
              </table>
            </div>
          </div>

          <div className="col-12 col-lg-6 my-5">
            <span className="fw-bolder fs-5">
              <i class="fa fa-award text-warning px-4 fs-3"></i>
              Lastest Users
            </span>

            <div className="table w-100 col-12 container-fluid text-white my-2">
              <table className="w-100 table table-dark table-borderless">
                <thead>
                  <tr className="text-white-50 ">
                    <th>USERNAME</th>
                    <th>NAME</th>
                  </tr>
                </thead>
                <tbody>{fetchLastestUsers()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
