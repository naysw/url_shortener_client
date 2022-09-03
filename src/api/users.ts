import axiosClient from "../lib/axios";

export const fetchMe = async () => {
  const res = await axiosClient.get("api/users/me");

  return res.data;
};
