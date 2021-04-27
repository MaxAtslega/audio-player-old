import React, { useEffect, useState } from "react";
import Head from "next/head";
import "@styles/globals.scss";
import { ThemeProvider } from "@providers/ThemeProvider";
import { wrapper } from "../src/store";
import App, { AppProps } from "next/app";
import { Store } from "redux";
import { ConnectedRouter } from "connected-next-router";
import initialize from "@lib/initialize";

interface Props {
  store: Store;
  pageProps: AppProps;
  Component: any;
}

export default wrapper.withRedux(
  class MyApp extends App<Props, null> {
    static async getInitialProps({ Component, ctx }: any) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}),
        },
      };
    }

    render() {
      const { Component, pageProps } = this.props;

      const Layout =
        Component.layout || (({ children }: any) => <>{children}</>);

      return (
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>{process.env.TITLE}</title>
          </Head>
          <ConnectedRouter>
            <ThemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ConnectedRouter>
        </React.Fragment>
      );
    }
  }
);
