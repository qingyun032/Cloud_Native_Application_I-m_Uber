import axios, { AxiosRequestConfig } from "axios";
import { path , testPath } from "./url.api";
import { userInfo, userMode } from "../models/user.model";
import { itineraryData , candidateInfo, itineraryQueryData } from "../models/trip";
import { tripInfo } from "../models/trip";

export const getCandidate = async (tripData: itineraryQueryData): Promise<candidateInfo[]> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/passengers/showCandidates",
    // url: testPath + "/candidates",
    data: tripData,
  };
  console.log(tripData);
  const response = await axios(config);
  return response.data;
};

export const selectCandidate = async (candidateData : {routeID: number, stopID: number, price: number}): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/passengers/selectCandidate",
    // url: testPath + "/candidates",
    data: candidateData,
  };
  console.log(candidateData);
  const response = await axios(config);
  return response.data;
};

// need modification
export const getArrivalTime = async (): Promise<tripInfo> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/passengers/getArrivalTime",
    // url: testPath + "CarInfo"
  };
  const response = await axios(config);
  return response.data;
};

export const sendRating = async (ratingData: {driverID: number, rating: number|null}): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/users/rating",
    // url: testPath,
    data: ratingData
  };
  const response = await axios(config);
  return response.data;
};