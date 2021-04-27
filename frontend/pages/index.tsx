import React, { Context } from "react";
import DefaultLayout from "@layouts/default";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../src/selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@lib/initialize";

function Index() {
  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);

  if (loggedin) {
    return <h1>Hallo</h1>;
  } else {
    if (typeof window !== "undefined") {
      router.push("/login");
    }

    return <h1>Bitte anmelden</h1>;
  }
}

Index.layout = DefaultLayout;
Index.getInitialProps = function(ctx: any) {
  initialize(ctx);
};

export default Index;
