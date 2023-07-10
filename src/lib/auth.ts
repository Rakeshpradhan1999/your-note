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
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
