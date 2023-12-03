import axios from "axios";
import { path } from "./url.api";
import { userInfo } from "../models/user.model";

export const getUserInfo = async (userName: string): Promise<userInfo> => {
  const response = await axios.get(path + "/api/v1/users/myInfo", { params: userName } );
  return response.data;
};