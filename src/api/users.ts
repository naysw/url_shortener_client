import axiosClient from "../lib/axios";
import { ServerResponse, User } from "../types";

export const fetchMe = async () => {
  const res = await axiosClient.get<ServerResponse<User>>("api/users/me");

  return res.data;
};
