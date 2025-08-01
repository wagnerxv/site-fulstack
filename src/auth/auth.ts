import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/providers/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Busca admin pelo email
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        // Não permite criação automática de admin
        if (!admin) {
          throw new Error("Invalid credentials");
        }

        // Valida senha
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return admin;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, id: token.id ?? user?.id };
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.id } };
    },
  },
} satisfies NextAuthOptions;
