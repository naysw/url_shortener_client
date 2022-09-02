import axiosClient from "../lib/axios";
import { ServerResponse, UrlModel } from "../types";

interface MakeShortPayload {
  originalUrl: string;
}

export async function makeShort(payload: MakeShortPayload) {
  const res = await axiosClient.post<ServerResponse<UrlModel>>(
    "/api/url/short",
    payload,
  );

  return res.data;
}
