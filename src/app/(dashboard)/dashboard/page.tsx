import Notes from "@/components/Notes";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getNotesRequest } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  // const { data, isLoading } = useQuery({ queryKey: ["notes"], queryFn: getNotesRequest });
  return (
    <div>
      <Link
        href={"dashboard/create"}
        className={cn(buttonVariants({ variant: "secondary" }))}
      >
        Create Note <PlusCircle className="ml-2 w-5 h-5 " />
      </Link>
      <Notes />
    </div>
  );
};

export default Dashboard;
