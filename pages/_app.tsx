import { onAuthStateChanged } from "firebase/auth";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import Head from "next/head";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ThemeLayout from "../src/components/layout/ThemeLayout";
import { auth } from "../src/config/firebase";
import store from "../src/redux/store";
import "../styles/globals.css";
import { useRouter } from "next/router";

// Declare AdProvider type
declare global {
  interface Window {
    AdProvider?: any[];
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    // Initialize AdProvider after the script is loaded
    const initAdProvider = () => {
      if (typeof window !== "undefined" && window.AdProvider) {
        (window.AdProvider = window.AdProvider || []).push({ serve: {} });
      } else {
        // Retry after a short delay if AdProvider is not yet available
        setTimeout(initAdProvider, 100);
      }
    };

    // Start initialization after component mounts
    initAdProvider();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <script
          async
          type="application/javascript"
          src="https://a.magsrv.com/ad-provider.js"
        ></script>
      </Head>
      <NextNProgress
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <Provider store={store}>
        <ThemeLayout>
          <Component {...pageProps} />
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <ins className="eas6a97888e6" data-zoneid="5668188"></ins>
          </div>
        </ThemeLayout>
      </Provider>
    </>
  );
}

export default MyApp;
