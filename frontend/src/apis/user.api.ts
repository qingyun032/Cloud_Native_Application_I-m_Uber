import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { userInfo } from "../models/user.model";

export const getUserInfo = async (): Promise<userInfo> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/users/myInfo"
  };
  const response = await axios(config);
  return response.data;
};
