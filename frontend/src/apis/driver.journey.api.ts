import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { Stop } from "../models/stop.model";
import { DriverRoute, DriverFav } from "../models/journey.model";

export const showStops = async (query: {isGo: boolean, address: string}): Promise<Stop[]> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/route/showStops",
    data: query,
  };
  console.log(query)
  const response = await axios(config);
  return response.data;
};

export const createRoute = async (route: DriverRoute): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/route/createRoute",
    data: route,
  };
  console.log(route)
  const response = await axios(config);
  return response.data;
}

export const updateDriverFav = async (route: DriverFav): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateDriverFav",
    data: route,
  };
  console.log(route)
  const response = await axios(config);
  return response.data;
}