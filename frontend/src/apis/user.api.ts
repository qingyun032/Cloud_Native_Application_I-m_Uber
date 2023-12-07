import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { userInfo } from "../models/user.model";

export const getUserInfo = async (userName: string): Promise<userInfo> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/users/myInfo",
    data: { userName },
  };
  const response = await axios(config);
  return response.data;
};