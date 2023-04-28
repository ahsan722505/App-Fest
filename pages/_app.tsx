import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
