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
  _count?: number;
}

export interface LoginResponse {
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  roles?: Role[];
}

export interface Visit {
  id: string;
  ip: string;
}

/**
 * Model Role
 *
 */
export type Role = {
  id: string;
  name: string;
};
