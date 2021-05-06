import React, { Context } from "react";
import { useSelector } from "react-redux";
import { isAdmin, isLoggedIn } from "@selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@utils/initialize";
import Main from "@components/Main";
import Header from "@components/Header";
import { Container } from "@components/Main/Main.styles"
import Loading from "@components/Loading/Loading";
import { loadAudiosAction } from "@actions/user.actions";
import waitForAction from "@utils/waitForAction";

function Index() {
  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);
  const admin = useSelector(isAdmin);

  if (loggedin && admin) {
    return(
      <Main>
        <Header/>
        <Container>

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
  console.log()
  if(ctx.store.getState().user.audios.length === 0){
    await ctx.store.dispatch(loadAudiosAction())
    await waitForAction(ctx.store);
  }
};

export default Index;
