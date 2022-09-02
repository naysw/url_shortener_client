import axiosClient from "../lib/axios";
import { ServerResponse, UrlModel } from "../types";

interface MakeShortPayload {
  originalUrl: string;
}

export const fetchManyUrls = async (payload: any) => {
  const res = await axiosClient.get<ServerResponse<UrlModel[]>>("api/url");

  return res.data;
};

export const makeShort = async (payload: MakeShortPayload) => {
  const res = await axiosClient.post<ServerResponse<UrlModel>>(
    "/api/url/short",
    payload,
  );

  return res.data;
};

export const deleteUrl = async (urlId: string) => {
  const res = await axiosClient.delete(`api/url/${urlId}`);

  return res.data;
};
