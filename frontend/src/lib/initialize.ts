import { getCookie } from "./cookie";
import { reauthenticateAction } from "../actions/auth.actions";

export default function initialize(ctx: any) {
  if (typeof window === "undefined") {
    console.log("123");
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(
        reauthenticateAction(getCookie("token", ctx.req) || "")
      );
    }
  }
}
