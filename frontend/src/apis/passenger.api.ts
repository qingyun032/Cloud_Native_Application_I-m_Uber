import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { userInfo, userMode } from "../models/user.model";
import { itineraryData , candidateInfo } from "../models/trip";

export const getCandidate = async (tripData: itineraryData): Promise<candidateInfo[]> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/passengers/showCandidates",
    data: tripData,
  };
  console.log(tripData);
  const response = await axios(config);
  return response.data;
};

