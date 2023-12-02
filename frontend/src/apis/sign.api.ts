import axios from "axios";
import { path } from "./url.api";
import { userSignIn, userSignUp } from "../models/user.model";

export const signIn = async (user: userSignIn): Promise<string> => {
  const response = await axios.get(path + "/api/v1/auth/signin", { params: user } );
  console.log(response.data);
  return response.data;
};

export const signUp = async (user: userSignUp): Promise<string> => {
  const response = await axios.post(path + "/api/v1/auth/signup", { user: user } );
  return response.data;
};

export const signOut = async (): Promise<string> => {
  const response = await axios.get(path + "/api/v1/auth/signout");
  return response.data;
};