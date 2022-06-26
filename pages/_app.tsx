import { onAuthStateChanged } from "firebase/auth";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ThemeLayout from "../src/components/layout/ThemeLayout";
import { auth } from "../src/config/firebase";
import store from "../src/redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <Provider store={store}>
        <ThemeLayout>
          <Component {...pageProps} />
        </ThemeLayout>
      </Provider>
    </>
  );
}

export default MyApp;
