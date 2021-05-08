import cookie from "js-cookie";
import { NextApiRequest } from "next";

export const setCookie = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 365,
    });
  }
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 365,
    });
  }
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: NextApiRequest) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

export const getCookie = (key: string, req: NextApiRequest) => {
  return typeof window === "undefined"
    ? getCookieFromServer(key, req)
    : getCookieFromBrowser(key);
};
