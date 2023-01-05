import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const showtimeApi = {
  getlistShowtimeByRoom: async (listRoomId, movieId) => {
    let params = {
      params: {
        movie_id: movieId,
        list_room_id: listRoomId,
      },
    };
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/room/get-list-by-room`,
      params
    );
    return request.data;
  },
};

export default showtimeApi;
