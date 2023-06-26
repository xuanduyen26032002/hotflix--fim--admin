import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../HOCs/layout";
import { fetchShowtimes } from "../../store/actions/showtimes";

const Showtimes = (props) => {
  const maPhim = props.match.params.maPhim;

  const showtimes = useSelector((state) => state.showtimes.showtimes) || {};

  const me = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    //if (!me) props.history.push("/admin/login");
    fetchShowtimes(dispatch, maPhim);
  }, [dispatch, maPhim]);

  const renderTableBody = useCallback(() => {
    if (showtimes.heThongRapChieu === undefined) return;

    const tableBodyHTML = showtimes.heThongRapChieu.map((htrc) => {
      htrc.cumRapChieu.map((crc) => {
        crc.lichChieuPhim.map((item) => {
         // console.log(item);
          return (
            <tr className="fs-6 text-center">
              <td>1</td>
              <td>{item.maLichChieu}</td>
              <td>{item.maRap}</td>
              <td>{item.tenRap}</td>
              <td>
                <span>{item.ngayChieuGioChieu.substr(0, 10)}</span>
                <br />
                <span>
                  <span className="text-warning">Time: </span>{" "}
                  {item.ngayChieuGioChieu.substr(11)}
                </span>
              </td>
              <td>{item.giaVe} VND</td>
              <td>{item.thoiLuong} m</td>
              <td className="d-flex justify-content-around">
                <button
                  className="btn btn-dark text-danger"
                  //   onClick={() => handleDeleteMovie(item.maPhim)}
                >
                  <i class="fa fa-trash fs-5"></i>
                </button>
              </td>
            </tr>
          );
        });
      });
    });

    // const tableBodyHTML = "";

    // const tableBodyHTML = dsLichChieuPhim.map((item) => {
    //   return (
    //     <tr className="fs-6 text-center">
    //       <td>
    //         {showtimes.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim.indexOf(
    //           item
    //         ) + 1}
    //       </td>
    //       <td>{item.maLichChieu}</td>
    //       <td>{item.maRap}</td>
    //       <td>{item.tenRap}</td>
    //       <td>
    //         <span>{item.ngayChieuGioChieu.substr(0, 10)}</span>
    //         <br />
    //         <span>
    //           <span className="text-warning">Time: </span>{" "}
    //           {item.ngayChieuGioChieu.substr(11)}
    //         </span>
    //       </td>
    //       <td>{item.giaVe} VND</td>
    //       <td>{item.thoiLuong} m</td>
    //       <td className="d-flex justify-content-around">
    //         <button
    //           className="btn btn-dark text-danger"
    //           //   onClick={() => handleDeleteMovie(item.maPhim)}
    //         >
    //           <i class="fa fa-trash fs-5"></i>
    //         </button>
    //       </td>
    //     </tr>
    //   );
    // });

    return tableBodyHTML;
  }, [showtimes]);

  return (
    <Layout>
      <div className="users__page container-fluid ">
        <div className="header row">
          <div className="header__tittle col-3 py-3">
            <span className="fs-2 fw-bolder">Showtimes</span>
          </div>
          <div className="header__action col-9 row py-3">
            <div className="col-12 d-flex justify-content-end">
              <NavLink to={`/admin/insertshowtime/${maPhim}`}>
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT SHOWTIME <i class="fa fa-plus text-warning"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive col-12 container-fluid text-white">
        <table className="w-100 table table-dark table-borderless">
          <thead>
            <tr className="text-white-50 text-center">
              <th>NO.</th>
              <th>SHOWTIME ID</th>
              <th>CINEMA ID</th>
              <th>CINEMA NAME</th>
              <th>SHOWTIMES</th>
              <th>TICKET PRICE</th>
              <th>TIME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Showtimes;
