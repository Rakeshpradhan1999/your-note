"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const CreateNote = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()} size={"sm"} variant={"secondary"}>
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </Button>
    </div>
  );
};

export default CreateNote;
