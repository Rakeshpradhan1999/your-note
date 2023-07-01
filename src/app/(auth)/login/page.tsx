import UserAuthForm from "@/components/user-auth-form";
import React from "react";
export const metadata = {
  title: "Login",
  description: "Login to your account",
};

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="max-w-[320px] w-full grid gap-4">
        <p className="font-bold text-lg text-center">Login Or Create Account</p>
        <UserAuthForm />
      </div>
    </div>
  );
};

export default Login;
