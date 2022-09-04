export interface ServerResponse<TData> {
  data: TData;
  message?: string;
  statusCode: number;
}

export interface LinkModel {
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

interface BasicQuery {
  params?: any;
}

export interface FetchLinksQuery extends BasicQuery {}

export interface LoginPaylod {
  username: string;
  password: string;
}

export interface MakeShortMutatonPayload {
  fullUrl: string;
  expiredAt?: string;
}
