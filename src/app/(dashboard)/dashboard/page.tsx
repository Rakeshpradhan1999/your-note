import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Link
        href={"dashboard/create"}
        className={cn(buttonVariants({ variant: "secondary" }))}
      >
        Create Note <PlusCircle className="ml-2 w-5 h-5 " />
      </Link>
    </div>
  );
};

export default Dashboard;
