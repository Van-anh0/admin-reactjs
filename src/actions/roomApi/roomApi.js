import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const movieApi = {
  getListRoom: async (movieId, cinemaId) => {
    let params = {
      params: {
        cinema_id: cinemaId,
      },
    };
    if (movieId) {
      params.params.movie_id = movieId;
    }
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/room/get-list`,
      params
    );
    return request.data;
  },
};

export default movieApi;
