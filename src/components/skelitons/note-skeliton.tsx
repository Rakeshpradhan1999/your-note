import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NoteSkeleton = () => {
  return (
    <div className="max-w-[600px] mx-auto pb-10">
      <Skeleton className="w-[200px] h-[40px] rounded-5" />
      <Skeleton className="w-full h-[300px] rounded-5 mt-5" />

      <Skeleton className="w-[100px] h-[30px] rounded-5 mt-5" />
    </div>
  );
};

export default NoteSkeleton;
