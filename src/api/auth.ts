import axiosClient from "../lib/axios";
import { LoginPaylod, LoginResponse, ServerResponse } from "../types";

/**
 * login api
 *
 * @param payload LoginPayload
 * @returns
 */
export async function login(
  payload: LoginPaylod,
): Promise<ServerResponse<LoginResponse>> {
  const res = await axiosClient.post<ServerResponse<LoginResponse>>(
    "api/auth/login",
    payload,
  );

  return res.data;
}
