import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
    };
  }
}
