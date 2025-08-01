import { authOptions } from "@/auth/auth";
import NextAuth from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    user: { id: string; name: string; email: string };
    // user: { id: string };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
