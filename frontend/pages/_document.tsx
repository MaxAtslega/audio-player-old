import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import * as cookie from "@utils/cookie";

interface Props {
  theme: string | undefined;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const theme = cookie.getCookie("theme", ctx.req);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        theme,
        ...initialProps,

        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  setInitialColorMode() {
    const code = `function setTheme(){
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches && !${
        this.props.theme ? `"${this.props.theme}"` : undefined
      }) {
        document.documentElement.setAttribute("data-theme", "dark");
      }else{
        document.documentElement.setAttribute("data-theme", "${
          this.props.theme ? this.props.theme : "light"
        }");
      }
    }`;
    return `(function(){${code}setTheme()})()`;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: this.setInitialColorMode(),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
