import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";
import {useUserDetail} from "@nextCode/context/user_detail"
import { v4 as uuidv4 } from "uuid";

// Add this type definition
type SafeUser = {
  email: string;
  name: string;
  image: string;
  uid: string;
  createdAt: number;
};


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        // Type check the user data
        if (!user.email || !user.name || !user.image) {
          throw new Error("Missing required user fields");
        }

        const safeUser: SafeUser = {
          email: user.email,
          name: user.name,
          image: user.image,
          uid: uuidv4(),
          createdAt: Date.now(),
        };

        // Save user info to Convex
        const userId = await convex.mutation(api.users.createUser, {
          email: safeUser.email,
          name: safeUser.name,
          img: safeUser.image,
          uid: safeUser.uid,
          createdAt: safeUser.createdAt,
        });

        if (!userId) throw new Error("Failed to create user");

        useUserDetail.getState().setUser({
          ...safeUser, 
          isGuest: false, 
          _id: userId // Convex will return a proper Id<"users"> here
        });

        return true;
      } catch (error) {
        console.error("Error saving user to Convex:", error);
        return false;
      }
    }
  }
};
