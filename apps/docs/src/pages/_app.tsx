"use client";
import { useEffect, useState } from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import Navbar from "../components/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider session={(pageProps as any).session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
