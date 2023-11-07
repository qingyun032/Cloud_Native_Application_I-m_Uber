import axios from "axios";
import { passenger, driver } from "../models/user.model";
import { path } from "./url.api";

export const test = async () => {
  const response = await axios.post(path + "/api/test");
}

export const testGetAllPassenger = async (): Promise<passenger[]> => {
  const response = await axios.get(path + "/api/testGetAllPassenger");
  return response.data;
}

export const testAddDriver = async (user: driver): Promise<driver> => {
  const response = await axios.post(path + "/api/testAddDriver", { user: user });
  return response.data;
}

export const testUpdatePassenger = async (user: passenger): Promise<passenger> => {
  const response = await axios.put(path + "/api/testUpdatePassenger", user);
  return response.data;
}

export const testDeleteDriver = async (user: driver): Promise<driver> => {
  const response = await axios.delete(path + "/api/testDeleteDriver", { params: user } );
  return response.data;
}