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

export const updateCarInfo = async (user: userInfo): Promise<userInfo> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateCarInfo",
    data: {
      "carPlate": user.car.license,
      "color": user.car.color,
      "brand": user.car.brand,
      "type": user.car.type,
      "electric": user.car.electric,
      "seat": user.car.seat
    }
  };
  const response = await axios(config);
  return response.data;
};

export const updateDriverInfo = async (user: userInfo): Promise<userInfo> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateDriver",
    data: {
      "email": user.email,
      "gender": user.gender,
      "phone": user.phone,
      "addressHome": user.home,
      "addressCompany": user.company,
      "carPlate": user.car.license,
      "color": user.car.color,
      "brand": user.car.brand,
      "type": user.car.type,
      "electric": user.car.electric,
      "seat": user.car.seat
    }
  };
  const response = await axios(config);
  return response.data;
};

export const updatePassengerInfo = async (user: userInfo): Promise<userInfo> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updatePassenger",
    data: {
      "email": user.email,
      "gender": user.gender,
      "phone": user.phone,
      "addressHome": user.home,
      "addressCompany": user.company,
    }
  };
  const response = await axios(config);
  return response.data;
};