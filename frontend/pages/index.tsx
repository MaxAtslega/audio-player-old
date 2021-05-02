import React, { Context } from "react";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../src/selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@lib/initialize";
import List from "@components/List";
import Main from "@components/Main";
import Header from "@components/Header";
import AudioPlayer from "@components/AudioPlayer";
import { Container } from "@components/Main/Main.styles"
function Index() {
  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);

  if (loggedin) {
    return(
    <Main>
      <Header/>
      <Container>
        <AudioPlayer/>
        <List/>
      </Container>
    </Main>);
  } else {
    if (typeof window !== "undefined") {
      router.push("/login");
    }

    return <h1>Bitte anmelden</h1>;
  }
}

Index.getInitialProps = function(ctx: any) {
  initialize(ctx);
};

export default Index;
