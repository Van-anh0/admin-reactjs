import React from "react";

function Room({ room, handleOnChangeRoom }) {
  return (
    <div>
      <select onChange={handleOnChangeRoom}>
        <option className="room__item">{room.name}</option>
      </select>
      <button>Xóa</button>
      <button>Sửa</button>
    </div>
  );
}
export default Room;
