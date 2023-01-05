import authorizedAxiosInstance from "utils/customAxios";
import { API_ROOT_GOLANG } from "utils/constants";

const movieApi = {
  createMovie: async (data) => {
    const request = await authorizedAxiosInstance.post(
      `${API_ROOT_GOLANG}/api/v1/movie/create`,
      data
    );
    return request.data;
  },

  // delete movie
  deleteMovie: async (id) => {
    const request = await authorizedAxiosInstance.delete(
      `${API_ROOT_GOLANG}/api/v1/movie/delete/${id}`
    );
    return request.data;
  },

  getListMovie: async (data) => {
    let params = {
      params: data,
    };
    const request = await authorizedAxiosInstance.get(
      `${API_ROOT_GOLANG}/api/v1/movie/get-list`,
      params
    );
    return request.data;
  },
};

export default movieApi;
