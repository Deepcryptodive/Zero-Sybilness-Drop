import "@/styles/globals.css";
import { getDefaultProvider } from "ethers";
import type { AppProps } from "next/app";
import { mumbaiFork } from "../../config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <img
        style={{ position: "absolute", right: 0, zIndex: -1, top: 0, marginRight: 25, width: "40%", height: "50%" }}
        src="/assets/theo-celebration.svg"
        alt="theo celebration bg image"
      />
      <Component {...pageProps} />
    </>
  );
}
