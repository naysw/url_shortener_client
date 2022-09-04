import axiosClient from "../lib/axios";
import {
  FetchLinksQuery,
  LinkModel,
  MakeShortMutatonPayload,
  ServerResponse,
} from "../types";

/**
 * fetch links query
 *
 * @param payload
 * @returns Promise<ServerResponse<LinkModel[]>>
 */
export const fetchLinks = async (
  payload: FetchLinksQuery,
): Promise<ServerResponse<LinkModel[]>> => {
  console.log(payload);
  const res = await axiosClient.get<ServerResponse<LinkModel[]>>("api/links", {
    params: payload.params,
  });

  return res.data;
};

/**
 * fetch link detail query
 *
 * @param id string
 * @returns Promise<ServerResponse<UrlModel>>
 */
export const fetctLinkDetails = async (
  id: string,
): Promise<ServerResponse<LinkModel>> => {
  const res = await axiosClient.get<ServerResponse<LinkModel>>(
    `api/links/${id}`,
  );

  return res.data;
};

/**
 * fetch auth user links query
 *
 * @returns Promise<ServerResponse<LinkModel[]>>
 */
export const fetchMyLinks = async (): Promise<ServerResponse<LinkModel[]>> => {
  const res = await axiosClient.get<ServerResponse<LinkModel[]>>(
    "api/links/my-links",
  );

  return res.data;
};

/**
 * make short url
 *
 * @param payload MakeShortMutatonPayload
 * @returns
 */
export const makeShort = async (
  payload: MakeShortMutatonPayload,
): Promise<ServerResponse<LinkModel>> => {
  const res = await axiosClient.post<ServerResponse<LinkModel>>(
    "/api/links/short",
    payload,
  );

  return res.data;
};

/**
 * delete link by id
 *
 * @param linkId string
 * @returns Promise<ServerResponse<LinkModel>>
 */
export const deleteUrl = async (
  linkId: string,
): Promise<ServerResponse<LinkModel>> => {
  const res = await axiosClient.delete<ServerResponse<LinkModel>>(
    `api/links/${linkId}`,
  );

  return res.data;
};
