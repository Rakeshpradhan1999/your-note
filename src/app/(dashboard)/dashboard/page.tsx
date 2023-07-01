import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusSquare } from "lucide-react";
import { Plus, PlusCircle, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Link href={"dashboard/create"} className={cn(buttonVariants())}>
        Create Note <PlusSquare className="ml-2 w-5 h-5 text-gray-600" />
      </Link>
    </div>
  );
};

export default Dashboard;
