import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { fetchMe } from "./store/actions/auth";
import Dashboard from "./views/dashboard";
import InsertUser from "./views/insertUser";
import LogIn from "./views/logIn";
import Movies from "./views/movies";
import Showtimes from "./views/showtimes";
import UpdateUser from "./views/updateUser";
import Users from "./views/users";
import InsertMovie from "./views/insertMovie";
import UpdateMovie from "./views/updateMovie";
import MovieDetail from "./views/movieDetail";
import InsertShowtime from "./views/insertShowtime";

const App = () => {
  const dispatch = useDispatch();

  const taiKhoan = localStorage.getItem("taiKhoan");

  useEffect(() => {
    if (taiKhoan) {
      fetchMe(dispatch, taiKhoan);
    }
  }, [dispatch, taiKhoan]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin" component={Dashboard}></Route>
        <Route path="/admin/login" component={LogIn}></Route>
        <Route path="/admin/users" component={Users}></Route>
        <Route path="/admin/insertuser" component={InsertUser}></Route>
        <Route path="/admin/updateuser" component={UpdateUser}></Route>
        <Route path="/admin/movies" component={Movies}></Route>
        <Route
          path="/admin/moviedetail/:maPhim"
          component={MovieDetail}
        ></Route>
        <Route path="/admin/insertmovie" component={InsertMovie}></Route>
        <Route path="/admin/updatemovie" component={UpdateMovie}></Route>
        <Route path="/admin/showtimes/:maPhim" component={Showtimes}></Route>
        <Route path="/admin/insertshowtime/:maPhim" component={InsertShowtime}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
