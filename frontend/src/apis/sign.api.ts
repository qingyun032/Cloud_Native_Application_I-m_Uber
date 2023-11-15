import axios from "axios";
import { path } from "./url.api";
import { user } from "../models/user.model";

export const userSignIn = async (userId: string): Promise<string> => {
  const response = await axios.get(path + "/api/signIn", { params: userId } );
  return response.data;
};

export const userSignUp = async (userId: user): Promise<string> => {
  const response = await axios.post(path + "/api/register", { userId: userId } );
  return response.data;
};