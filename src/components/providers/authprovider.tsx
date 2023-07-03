"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
// import NextNProgress from "nextjs-progressbar";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {/* <NextNProgress options={{ easing: "ease", speed: 500 }} /> */}
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
