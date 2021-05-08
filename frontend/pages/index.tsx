import React from "react";
import { useSelector } from "react-redux";
import { isLoggedIn } from "@selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@utils/initialize";
import List from "@components/List";
import Main from "@components/Main";
import Header from "@components/Header";
import AudioPlayer from "@components/AudioPlayer";
import { Container } from "@components/Main/Main.styles";
import Loading from "@components/Loading";
import { loadAudiosAction } from "@actions/user.actions";
import waitForAction from "@utils/waitForAction";

function Index() {
  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);

  if (loggedin) {
    return (
      <Main>
        <Header />
        <Container>
          <AudioPlayer />
          <List />
        </Container>
      </Main>
    );
  }
  if (typeof window !== "undefined") {
    router.push("/login");
  }

  return <Loading />;
}

Index.getInitialProps = async function getInitialProps(ctx: any) {
  await initialize(ctx);
  if (ctx.store.getState().user.audios.length === 0) {
    await ctx.store.dispatch(loadAudiosAction());
    await waitForAction(ctx.store);
  }
};

export default Index;
