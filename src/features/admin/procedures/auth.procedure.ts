// src/features/user/procedures/auth.procedure.ts
import { igniter } from "@/igniter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import { prisma } from "@/providers/prisma";

export const auth = igniter.procedure({
  name: "require-admin-auth",
  handler: async (_options, { response }) => {
    // Adapta o request/response do Igniter para o formato NextAuth
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return response.unauthorized("Not authenticated");
    }

    // Busca admin no banco para garantir existência
    const admin = await prisma.admin.findUnique({
      where: { id: session.user.id },
    });
    if (!admin) {
      return response.unauthorized("Admin not found");
    }

    // Injeta admin autenticado no contexto
    return { admin };
  },
});
