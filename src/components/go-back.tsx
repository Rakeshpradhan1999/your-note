"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} size={"sm"} variant={"ghost"}>
      <ArrowLeft className="w-5 h-5 mr-1" /> Back
    </Button>
  );
};

export default GoBack;
