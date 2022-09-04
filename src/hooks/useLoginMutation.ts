import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login } from "../api/auth";
import { LoginPaylod, LoginResponse, ServerResponse } from "../types";

/**
 * login mutation hook
 *
 * @returns UseMutationResult<ServerResponse<LoginResponse>, unknown, LoginPaylod, unknown>
 */
export function useLoginMutation(): UseMutationResult<
  ServerResponse<LoginResponse>,
  Error,
  LoginPaylod,
  unknown
> {
  return useMutation(login);
}
