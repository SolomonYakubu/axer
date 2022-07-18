import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import { NextSeo } from "next-seo";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Axer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="rgb(107, 36, 168)" />
      </Head>
      <NextSeo
        title="Axer"
        titleTemplate="Axer"
        defaultTitle="Axer"
        description="Axer is a Link Shortener that gives you the power to grow and monitor your brand."
        canonical="https://axer.ga"
        openGraph={{
          url: "https://axer.ga",
          title: "Axer",
          description:
            "Axer is a Link Shortener that gives you the power to grow and monitor your brand",
          // images: [
          //   {
          //     url: "/og-image.png",
          //     width: 800,
          //     height: 420,
          //     alt: "Axer",
          //   },
          // ],
        }}
        twitter={{
          handle: "@King__Solo",
          site: "@King__Solo",
          cardType: "summary_large_image",
        }}
      />

      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
