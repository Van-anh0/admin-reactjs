import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const cinemaApi = {
  getListCinema: async () => {
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/cinema/get-list`
    );
    return request.data;
  },
};

export default cinemaApi;
