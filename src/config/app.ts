import { Paths } from "../paths";

export const APP_NAME = "";
export const DEMO_MODE = false;
export const ACCESS_TOKEN = "snL61wkX0PvjKmHmvhrZZQmCgMpBIbcs";

/**
 * is logged in cookie
 */
export const IS_LOGGED_IN_KEY = "__JYU^E^WE&E";
export const IS_LOGGED_IN_VALUE = "fd44adYnj544(^5q43)933b763c7049ea844b5";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

/**
 * redirect page if user is not authenticated
 */
export const REDIRECT_IF_UNAUTHENTICATED = Paths.LOGIN;

/**
 * redirect page if user is authenticated
 */
export const REDIRECT_IF_AUTHENTICATED = Paths.HOME;
export const DEFAULT_TAKE = 3;
