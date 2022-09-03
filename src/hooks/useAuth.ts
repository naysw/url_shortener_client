import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRendersCount } from "react-use";
import { fetchMe } from "../api/users";
import {
  ACCESS_TOKEN,
  IS_LOGGED_IN_KEY,
  IS_LOGGED_IN_VALUE,
  REDIRECT_IF_AUTHENTICATED,
  REDIRECT_IF_UNAUTHENTICATED,
} from "../config/app";
import { QUERY_KEYS } from "../config/constants";

type Guard = "auth" | "guest";

interface Props {
  redirectIfAuthenticated?: boolean;
  guard?: Guard;
  redireactIfUnauthenticated?: boolean | string;
}

export default function useAuth({
  guard = "auth",
  redireactIfUnauthenticated = true,
}: Props = {}) {
  const navigate = useNavigate();
  const { data, error } = useQuery([QUERY_KEYS.ME], fetchMe, {
    enabled: hasLoggedInCookie(),
    onError: () => logout(),
  });
  console.log(useRendersCount());

  /**
   * handle logout
   *
   * @return void
   */
  function logout(): void {
    /**
     * remove isLoggedIn cookie
     */
    Cookies.remove(IS_LOGGED_IN_KEY);

    /**
     * remove access token from local storage
     */
    window.localStorage.removeItem(ACCESS_TOKEN);

    /**
     * redirect to unauthenticated page
     */
    navigate(REDIRECT_IF_UNAUTHENTICATED);
  }

  /**
   * get access token from cookie
   *
   * @returns boolean
   */
  function hasLoggedInCookie(): boolean {
    const isLoggedInCookie = Cookies.get(IS_LOGGED_IN_KEY);

    return Boolean(isLoggedInCookie) && isLoggedInCookie === IS_LOGGED_IN_VALUE;
  }
  /**
   * assign finished as a boolean to indicate if the request is finished
   */
  const finished = Boolean(data);

  /**
   * parse user data from response
   */
  const user = data?.data;

  /**
   * assign hasUser as a boolean to indicate if the user is found
   */
  const hasUser = Boolean(user);

  React.useEffect(() => {
    /**
     * if guard is "auth" and not found isLoggedIn cookie
     * and redirectIfAuthenticated is boolean value and true
     * then redirect to unauthenticated page
     *
     * default redirect is Login page
     */

    if (
      /**
       * if guard inclues "auth" and not include "guest"
       * and not found isLoggedIn cookie and redirectIfAuthenticated is boolean value and true
       */
      guard === "auth" &&
      !hasLoggedInCookie() &&
      !hasUser &&
      redireactIfUnauthenticated
    ) {
      if (
        /**
         * if redirectIfUnauthenticated is string value and not empty
         * then redirect to the string value
         */
        typeof redireactIfUnauthenticated === "string"
      ) {
        navigate(redireactIfUnauthenticated);
      } else if (
        /**
         * if redirectIfUnauthenticated is boolean value and true
         * and redirectIfUnauthenticated is true
         * then redirect to unauthenticated page with callback url
         */
        typeof redireactIfUnauthenticated === "boolean" &&
        redireactIfUnauthenticated === true
      ) {
        // navigate({
        //   pathname: REDIRECT_IF_UNAUTHENTICATED,
        //   query: {
        //     redirect: router.asPath,
        //   },
        // });
      } else {
        return;
      }
    } else if (
      /**
       * if guard has guest and not include auth
       * and alos has loggedIn cookie
       * then redirect to authenticated page
       */
      guard === "guest" &&
      hasLoggedInCookie()
    ) {
      navigate(REDIRECT_IF_AUTHENTICATED);
    } else if (
      /**
       * fetch user is finisied and
       * already user data
       * and hasUser is true
       * then user is present
       */
      finished &&
      user &&
      hasUser
    ) {
      console.log("Authenticated", hasUser);
    } else {
      console.log("Do nothing");
      return;
    }
  }, [finished, user, hasUser, guard, redireactIfUnauthenticated]);

  /**
   * if user is found and not error, return user data else return null
   */
  return {
    user: error ? null : user,
    logout,
  };
}
