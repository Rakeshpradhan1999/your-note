"use client";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
export function SiteHeader() {
  const { data, status } = useSession();
  const router = useRouter();
  // console.log(data);
  const isLoading = status === "loading";
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3">
            <ModeToggle />
            {!isLoading && !data?.user ? (
              <Link
                className={cn(
                  buttonVariants({ size: "sm", variant: "secondary" })
                )}
                href={"/login"}
              >
                Login
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={data?.user?.image || ""} alt="" />
                    <AvatarFallback>{data?.user.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={data?.user?.image || ""} alt="" />
                      <AvatarFallback>{data?.user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      {data?.user?.name}
                      <p className="text-xs">{data?.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
