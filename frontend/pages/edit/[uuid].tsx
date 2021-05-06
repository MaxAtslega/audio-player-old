import React, { Context, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getToken, isAdmin, isLoggedIn } from "@selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@utils/initialize";
import Main from "@components/Main";
import Header from "@components/Header";
import { Container } from "@components/Main/Main.styles"
import Loading from "@components/Loading/Loading";
import { getAudio, getAudios } from "@selectors/user.selectors";
import { LOAD_AUDIOS_SUCCESS, loadAudiosAction } from "@actions/user.actions";
import { UNAUTHORIZED_ERROR } from "@actions/auth.actions";
import waitForAction from "@utils/waitForAction";

function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);
  const admin = useSelector(isAdmin);
  const audio = useSelector(getAudio)(String(router.query.uuid))

  if (loggedin && admin && audio.name) {
    return(
      <Main>
        <Header/>
        <Container>
          {JSON.stringify(audio)}
        </Container>
      </Main>);
  } else {
    if (typeof window !== "undefined") {
      router.push(!loggedin ? "/login" : "/");
    }

    return <Loading/>;
  }
}



Index.getInitialProps = async function(ctx: any) {
  await initialize(ctx);
  if(ctx.store.getState().user.audios.length === 0){
    await ctx.store.dispatch(loadAudiosAction())
    await waitForAction(ctx.store);
  }
};

export default Index;
