import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const showtimeApi = {
  createShowtime: async (data) => {
    const request = await authorizedAxiosInstance.post(
      `${API_ROOT_GOLANG}/api/v1/show/create`,
      data
    );
    return request.data;
  },
  
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
  getList: async (cinemaId) => {
    let params = {
      params: {
        cinema_id: cinemaId,
      },
    };
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/show/get-list`,
      params
    );
    return request.data;
  },
  createMultiple: async (data) => {
    const request = await authorizedAxiosInstance.post(
      `${API_ROOT_GOLANG}/api/v1/show/create-multiple`,
      data
    );
    return request.data;
  },
};

export default showtimeApi;
