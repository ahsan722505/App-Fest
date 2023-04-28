import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Poppins, Montserrat } from "next/font/google";
import Layout from "@/components/Layout";
import { UserProvider } from "@/contexts/userContext";
const poppins = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </main>
  );
}
