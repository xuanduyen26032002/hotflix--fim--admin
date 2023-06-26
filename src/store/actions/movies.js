import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllMovies = async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
    });

    dispatch(createAction(actionType.SET_MOVIES, res.data));
  } catch (err) {
    alert(err.response.data);
  }
};

export const fetchMovies = async (dispatch, pageNumber, tuKhoa = "") => {
  let __url = "";

  if (tuKhoa === "") {
    __url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${pageNumber}&soPhanTuTrenTrang=10`;
  } else {
    __url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&tenPhim=${tuKhoa}&soTrang=${pageNumber}&soPhanTuTrenTrang=10`;
  }

  try {
    const res = await axios({
      method: "GET",
      url: __url,
    });

    dispatch(createAction(actionType.SET_MOVIES, res.data.items));
  } catch (err) {
    alert(err.response.data);
  }
};

export const fetchMovieDetail = (dispatch, item) => {
  dispatch(createAction(actionType.SET_MOVIE_DETAIL, item));
};

export const uploadMovieImage = (newData, props) => {
  console.log(newData);
  var frm = new FormData();
  frm.append("File", newData.hinhAnh);
  frm.append("tenPhim", newData.tenPhim);
  frm.append("maNhom", "GP01");

  console.log(frm);

  axios({
    method: "POST",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
    data: frm,
  })
    .then((res) => {
      alert("Successfully Updated Movie: " + newData.maPhim);
      props.history.push("/admin/movies");
    })
    .catch((err) => {
      alert(err.response.data);
    });
};

export const updateMovie = (newData, accessToken, props) => {
  console.log(newData);
  axios({
    method: "POST",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
    data: newData,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      uploadMovieImage(newData, props);
    })
    .catch((err) => {
      alert(err.response.data);
    });
};

export const insertMovie = (newMovie, accessToken, props) => {
  axios({
    method: "POST",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim",
    data: newMovie,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log(res);
      uploadMovieImage(newMovie, props);
    })
    .catch((err) => {
      alert(err.response.data);
    });
};

export const deleteMovie = (maPhim, accessToken, props) => {
  axios({
    method: "DELETE",
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      alert("Successfully Deleted Movie: " + maPhim);
    })
    .catch((err) => {
      alert(err.response.data);
    });
};
