"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
const GetStarted = () => {
  const { data } = useSession();
  return (
    <Link
      href={`${data?.user ? "/login" : "/dashboard"}`}
      className={cn(buttonVariants(), "max-w-max mx-auto")}
    >
      Get Started
    </Link>
  );
};

export default GetStarted;
