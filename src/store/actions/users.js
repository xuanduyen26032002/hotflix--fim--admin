import axios from "axios";
import { actionType } from "./type";
import { createAction } from "./index";

export const fetchAllUsers = async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
    });

    dispatch(createAction(actionType.SET_USERS, res.data));
  } catch (err) {
    alert(err.response.data);
  }
};

export const fetchUsers = async (dispatch, pageNumber, tuKhoa = "") => {
  let __url = "";

  if (tuKhoa === "") {
    __url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${pageNumber}&soPhanTuTrenTrang=20`;
  } else {
    __url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${tuKhoa}&soTrang=${pageNumber}&soPhanTuTrenTrang=20`;
  }

  try {
    const res = await axios({
      method: "GET",
      url: __url,
    });

    dispatch(createAction(actionType.SET_USERS, res.data.items));
  } catch (err) {
    alert(err.response.data);
  }
};

export const fetchUserDetail = (dispatch, item) => {
  dispatch(createAction(actionType.SET_USER_DETAIL, item));
};

export const insertUser = (newUser, accessToken, props) => {
  axios({
    method: "POST",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
    data: { newUser },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      alert("Successfully Inserted Account: " + newUser.taiKhoan);

      props.history.push("/admin/users");
    })
    .catch((err) => {
      // Toàn bị lỗi 403: Forbidden

      console.log(err.response);
      alert(err.response.statusText);
    });
};

export const updateUser = (newData, accessToken, props) => {
  axios({
    method: "PUT",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    data: newData,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      alert("Successfully Updated Account: " + newData.taiKhoan);
      props.history.push("/admin/users");
    })
    .catch((err) => {
      alert(err.response.data);
    });
};

export const deleteUser = (taiKhoan, accessToken) => {
  axios({
    method: "DELETE",
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      alert("Successfully Deleted Account: " + taiKhoan);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
};
