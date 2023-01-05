import React, { useState } from "react";
import "./Modal.scss";
import { movieApi } from "actions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ModalMovie = ({ handleClickModal }) => {
  const [movie, setMovie] = useState({
    format: "2D",
  });

  const handleCloseModal = () => {
    handleClickModal();
  };

  const handleChange = (e) => {
    // if value of duration is number, convert to number
    if (e.target.name === "duration") {
      setMovie({ ...movie, [e.target.name]: Number(e.target.value) });
    } else setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  function checkMovie() {
    if (
      movie.name &&
      movie.type &&
      movie.director &&
      movie.spoil &&
      movie.trailer &&
      movie.duration &&
      movie.format &&
      movie.status
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleOnCreateMovie(e) {
    e.preventDefault();
    if (checkMovie()) {
      movieApi.createMovie(movie).then((res) => {
        alert(res);
      });
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  }

  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_bg">
          <div className="modal_close" onClick={() => handleCloseModal()}>
            X
          </div>
          <h1>Tạo phim mới</h1>
          <form className="modal_content" onSubmit={handleOnCreateMovie}>
            <TextField
              id="outlined-basic"
              label="Tên phim"
              variant="outlined"
              name="name"
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Thể loại"
              variant="outlined"
              name="type"
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Diễn viên"
              variant="outlined"
              name="cast"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Đạo diễn"
              variant="outlined"
              name="director"
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Mô tả"
              variant="outlined"
              name="spoil"
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Trailer"
              variant="outlined"
              name="trailer"
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Hình ảnh"
              variant="outlined"
              name="poster"
              onChange={handleChange}
              // required
            />
            <TextField
              id="date"
              label="Ngày khởi chiếu"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={movie.format}
              label="Format"
              name="format"
              onChange={handleChange}
            >
              <MenuItem value={"2D"}>2D</MenuItem>
              <MenuItem value={"3D"}>3D</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="Thời lượng"
              variant="outlined"
              name="duration"
              onChange={handleChange}
              required
            />
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={movie.status}
              label="Status"
              name="status"
              onChange={handleChange}
            >
              <MenuItem value={"showing"}>Showing</MenuItem>
              <MenuItem value={"toshow"}>ToShow</MenuItem>
            </Select>
            <TextField
              id="date"
              label="Ngày kết thúc"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-basic"
              label="Giới hạn độ tuổi"
              variant="outlined"
              name="rated"
              onChange={handleChange}
            />
            <TextField type="submit" onClick={() => handleOnCreateMovie()} />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ModalMovie;
