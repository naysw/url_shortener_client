export interface ServerResponse<TData> {
  data: TData;
  message?: string;
  statusCode: number;
}

export interface UrlModel {
  id: string;
  shortCode: string;
  originalUrl: string;
  link: string;
}

export interface LoginResponse {
  accessToken: string;
}
