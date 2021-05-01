import { getCookie } from "./cookie";
import { reauthenticateAction } from "../actions/auth.actions";
import Router from "next/router";

export default function initialize(ctx: any) {
  if (typeof window === "undefined") {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(
        reauthenticateAction(getCookie("token", ctx.req) || "")
      );
    }
  }else{
    const token = ctx.store.getState().auth.token;

    if(token && (ctx.pathname === '/login')) {
      setTimeout(function() {
        Router.push('/');
      }, 0);
    }
  }
}
