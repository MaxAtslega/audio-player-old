import { reauthenticateAction } from "@actions/auth.actions";
import Router from "next/router";
import { getCookie } from "./cookie";

export default async function initialize(ctx: any) {
  if (typeof window === "undefined") {
    if (ctx.req.headers.cookie) {
      const token = getCookie("token", ctx.req);
      if (token) {
        await ctx.store.dispatch(reauthenticateAction(token));
      }
    }
  } else {
    const { token } = ctx.store.getState().auth;

    if (token && ctx.pathname === "/login") {
      setTimeout(Router.push("/"), 0);
    }
  }
}
