import { getCookie } from "./cookie";
import { reauthenticateAction } from "@actions/auth.actions";
import Router from "next/router";

export default async function initialize(ctx: any) {
  if (typeof window === "undefined") {
    if (ctx.req.headers.cookie) {
      let token = getCookie("token", ctx.req);
      if(token){
        await ctx.store.dispatch(reauthenticateAction(token));
      }

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
