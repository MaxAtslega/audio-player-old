import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  blockingSetInitialColorMode = `
  (function(){
    ${"function " + this.setInitialColorMode.toString()}
    setInitialColorMode();
  })()
  `;

  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
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
    function getInitialColorMode() {
      const persistedColorPreference = window.localStorage.getItem("theme");
      const hasPersistedPreference =
        typeof persistedColorPreference === "string";

      if (hasPersistedPreference) {
        return persistedColorPreference;
      }

      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const hasMediaQueryPreference = typeof mql.matches === "boolean";

      if (hasMediaQueryPreference) {
        return mql.matches ? "dark" : "light";
      }

      return "light";
    }

    const colorMode = getInitialColorMode();
    const root = document.documentElement;
    root.style.setProperty("--initial-color-mode", colorMode);

    if (colorMode === "dark")
      document.documentElement.setAttribute("data-theme", "dark");
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: this.blockingSetInitialColorMode,
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
