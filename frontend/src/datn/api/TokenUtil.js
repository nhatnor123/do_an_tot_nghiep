import Cookies from "js-cookie";

const cookieName = "access_token";

export const getAccessToken = () => Cookies.get(cookieName);
export const removeToken = () => Cookies.remove(cookieName);
export const setAccessToken = (token) => Cookies.set(cookieName, token);
