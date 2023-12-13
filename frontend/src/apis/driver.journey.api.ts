import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { Stop } from "../models/stop.model";

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

export const createRoute = async (route: {startTime: string, start: number, destination: number, stopIDs: number[], available: number, type: string}): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/route/createRoute",
    data: route,
  };
  console.log(route)
  const response = await axios(config);
  return response.data;
}