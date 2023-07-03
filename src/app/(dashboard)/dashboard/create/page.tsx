"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Edior from "@/components/editor";

const CreateNote = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()} size={"sm"} variant={"ghost"}>
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </Button>
      <Edior />
    </div>
  );
};

export default CreateNote;
