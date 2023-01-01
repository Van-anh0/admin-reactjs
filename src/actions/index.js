import authorizedAxiosInstance from "../utils/customAxios";
import { API_ROOT_GOLANG } from "../utils/constants";

export const getListUser = async () => {
  const request = await authorizedAxiosInstance.get(
    `${API_ROOT_GOLANG}/api/v1/user/get-list`
  );
  return request.data;
};

export const getListMovies = async () => {
  const request = await authorizedAxiosInstance.get(
    `${API_ROOT_GOLANG}/api/v1/movie/get-list`
  );
  return request.data;
};
