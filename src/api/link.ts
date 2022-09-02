import axiosClient from "../lib/axios";
import { ServerResponse, UrlModel } from "../types";

interface MakeShortPayload {
  fullUrl: string;
}

export const fetchManyUrls = async (payload: any) => {
  const res = await axiosClient.get<ServerResponse<UrlModel[]>>("api/links");

  return res.data;
};

export const makeShort = async (payload: MakeShortPayload) => {
  const res = await axiosClient.post<ServerResponse<UrlModel>>(
    "/api/links/short",
    payload,
  );

  return res.data;
};

export const deleteUrl = async (urlId: string) => {
  const res = await axiosClient.delete(`api/links/${urlId}`);

  return res.data;
};
