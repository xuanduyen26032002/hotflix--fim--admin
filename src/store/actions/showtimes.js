import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchShowtimes = async (dispatch, maPhim) => {
  try {
    const res = await axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    });

    dispatch(createAction(actionType.SET_SHOWTIMES, res.data));
    // console.log(res.data.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim);
  } catch (err) {
    console.log(err);
    // alert(err.response.data);
  }
};

export const insertShowtime = async (accessToken, data, props) => {
  console.log(data);
  try {
    const res = await axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
      data: { data },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    alert("Successfully Inserted Showtime Of Movie: " + data.maPhim);
    props.history.push(`/admin/showtimes/:${data.maPhim}`);
  } catch (err) {
    alert(err.response.data);
  }
};
