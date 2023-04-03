import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const roomApi = {
  getListRoom: async (cinemaId) => {
    let params = {
      params: {
        cinema_id: cinemaId,
      },
    };
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/room/get-list`,
      params
    );
    return request.data;
  },
};

export default roomApi;
