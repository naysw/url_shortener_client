import { Role } from "../types";

/**
 * check user has role
 *
 * @param roles array of roles
 * @param roleName string
 * @returns
 */
export function hasRole(roles?: Role[], roleName?: string) {
  if (!Array.isArray(roles)) return false;

  return roles.some((r) => r.name === roleName);
}

export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
};
