import axiosClient from "../lib/axios";
import { ServerResponse, User } from "../types";

/**
 * fetch auth user query
 *
 * @returns Promise<ServerResponse<User>>
 */
export const fetchMe = async (): Promise<ServerResponse<User>> => {
  const res = await axiosClient.get<ServerResponse<User>>("api/users/me");

  return res.data;
};
