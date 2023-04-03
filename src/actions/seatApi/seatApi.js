import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const seatApi = {
  getListSeat: async (roomId) => {
    let params = {
      params: {
        room_id: roomId,
      },
    };
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/admin/seat/get-list`,
      params
    );
    return request.data;
  },

  createSeat: async (seat) => {
    const request = await authorizedAxiosInstance.post(
      `${API_ROOT_GOLANG}/api/v1/admin/seat/create`,
      seat
    );
    return request.data;
  },
};

export default seatApi;
