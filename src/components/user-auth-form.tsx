"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Icons } from "./icons";
const UserAuthForm = () => {
  //   const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Button
      onClick={() => {
        // setLoading(true);
        signIn("google", { callbackUrl: "/" });
      }}
      variant={"outline"}
      className="w-full"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className=" animate-spin mr-2 h-5 w-5" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}
      Login with Google
    </Button>
  );
};

export default UserAuthForm;
