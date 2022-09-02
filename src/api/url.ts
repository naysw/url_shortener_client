import axiosClient from "../lib/axios";

interface MakeShortPayload {
  originalUrl: string;
}

export async function makeShort(payload: MakeShortPayload) {
  const res = await axiosClient.post("/api/url/short", payload);
}
