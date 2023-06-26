import { createAction } from "./index";
import axios from "axios";
import { actionType } from "./type";

export const logIn = (dispatch, account) => {
  axios({
    method: "POST",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
    data: account,
  })
    .then((res) => {
      // Check Admin Account
      if (res.data.maLoaiNguoiDung === "QuanTri") {
        dispatch(createAction(actionType.SET_ME, res.data));
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("taiKhoan", res.data.taiKhoan);
      } else alert("Please Use Administration Account !");
    })
    .catch((err) => {
      console.log(err);
      // alert(err.response.data);
    });
};

export const logOut = (dispatch) => {
  dispatch(createAction(actionType.SET_ME, null));
  localStorage.removeItem("taiKhoan");
  localStorage.removeItem("accessToken");
};

export const fetchMe = async (dispatch, taiKhoan) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      data: { taiKhoan },
    });

    dispatch(createAction(actionType.SET_ME, res.data));
  } catch (err) {
    console.log(err);
  }
};
