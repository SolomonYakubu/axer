import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Axer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="rgb(107, 36, 168)" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
