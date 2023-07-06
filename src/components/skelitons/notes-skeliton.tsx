import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

const NotesSkeleton = () => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
      {[1, 2, 3, 4].map((item) => (
        <Card
          key={item}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <CardHeader>
            <Skeleton className="w-full h-[20px] rounded-5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[200px] rounded-5" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotesSkeleton;
