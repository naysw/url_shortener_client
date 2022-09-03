export interface ServerResponse<TData> {
  data: TData;
  message?: string;
  statusCode: number;
}

export interface UrlModel {
  id: string;
  shortCode: string;
  fullUrl: string;
  shortUrl: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
}
