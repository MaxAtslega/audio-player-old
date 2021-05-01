import React, { useEffect, useState } from "react";
import Head from "next/head";
import "@styles/globals.scss";
import { ThemeProvider } from "@providers/ThemeProvider";
import { wrapper } from "../src/store";
import App, { AppProps } from "next/app";
import { ConnectedRouter } from "connected-next-router";

interface Props {
  pageProps: AppProps;
  Component: any;
}

export default wrapper.withRedux(
  class MyApp extends App<Props, null> {
    static async getInitialProps({ Component, ctx }: any) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      return { pageProps }
    }



    render() {
      const { Component, pageProps } = this.props;

      return (
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta charSet="utf-8" />
            <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="192x192"  href="/static/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta name="description" content="Audio-Player"/>
            <title>{process.env.TITLE}</title>
          </Head>
          <ConnectedRouter>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </ConnectedRouter>
        </React.Fragment>
      );
    }
  }
);
