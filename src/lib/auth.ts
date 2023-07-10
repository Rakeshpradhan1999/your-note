import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/database";
import { NextAuthOptions, getServerSession } from "next-auth";
import UserModel from "@/models/UserModel";
import { connectToDatabase } from "./db";
// import UserModel from "@/models/UserModel";
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId:
        "377196079608-9kliqcqu56ep9v8j3hou4jv4c04voak1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      // console.log(token, user);
      await connectToDatabase();
      const findUser = await UserModel.findOne({ email: token?.email });
      const { name, _id, email, image } = findUser;
      return { name, id: _id, email, picture: image };
    },
  },
  debug: true,
};
export const getAuthSession = () => getServerSession(authOptions);
