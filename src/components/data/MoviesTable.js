import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MovieTable.scss";
import { movieApi } from "actions";

export default function MoviesTable(props) {
  function handleDeleteMovie(id) {
    movieApi.deleteMovie(id).then((res) => {
      alert("Xóa thành công");
      window.location.reload(); // todo: fix this
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Chỉnh sửa</TableCell>
            <TableCell align="left">Tên phim</TableCell>
            <TableCell align="left">Hình ảnh</TableCell>
            <TableCell align="right">Ngày chiếu</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
            <TableCell align="right">Ngày kết thúc</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listMovies.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <button>Sửa</button>
                <button onClick={() => handleDeleteMovie(row.id)}>Xóa</button>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <img
                src={
                  row?.poster
                    ? row.poster
                    : "https://upload.wikimedia.org/wikipedia/vi/e/e0/Avatar_D%C3%B2ng_ch%E1%BA%A3y_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_-_Poster_ch%C3%ADnh_th%E1%BB%A9c.jpg"
                }
                className="movie_image"
              ></img>
              <TableCell align="right">{row.release_date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
