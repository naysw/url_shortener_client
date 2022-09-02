import axiosClient from "../lib/axios";
import { LoginResponse, ServerResponse } from "../types";

export async function login(payload: any) {
  const res = await axiosClient.post<ServerResponse<LoginResponse>>(
    "api/auth/login",
    payload,
  );

  return res.data;
}
