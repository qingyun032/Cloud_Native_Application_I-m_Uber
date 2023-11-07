import axios from "axios";
import { path } from "./url.api";

export const userSignIn = async (userId: string): Promise<number[]> => {
  const response = await axios.get(path + "/api/signIn", { params: userId } );
  return response.data;
};

export const userSignUp = async (userId: string): Promise<string> => {
  const response = await axios.post(path + "/api/register", { userId: userId } );
  return response.data;
};