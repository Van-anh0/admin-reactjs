import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export default function MoviesTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên phim</TableCell>

            <TableCell align="left">Mô tả</TableCell>
            <TableCell align="right">Ngày khởi chiếu</TableCell>
            <TableCell align="right">Thể loại</TableCell>
            <TableCell align="right">Diễn viên</TableCell>
            <TableCell align="right">Đạo diễn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listMovies.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="right">{row.release_date}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.cast}</TableCell>
              <TableCell align="right">{row.director}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
