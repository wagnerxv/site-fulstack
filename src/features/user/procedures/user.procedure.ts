import { igniter } from "@/igniter";
import type {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  UserQueryParams,
} from "../user.interface";

export const UserFeatureProcedure = igniter.procedure({
  name: "UserFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      user: {
        findMany: async (query: UserQueryParams): Promise<User[]> => {
          const limit = query.limit ? Number(query.limit) : 10;
          const page = query.page ? Number(query.page) : 1;

          return context.providers.database.user.findMany({
            where: query.search
              ? {
                  OR: [{ name: { contains: query.search } }],
                }
              : undefined,
            skip: page > 1 ? (page - 1) * limit : undefined,
            take: limit,
            orderBy: query.sortBy
              ? { [query.sortBy]: query.sortOrder || "asc" }
              : undefined,
            // ✅ Incluir eventos relacionados
            include: {
              events: {
                orderBy: {
                  startDate: "asc",
                },
              },
            },
          });
        },
        findOne: async (params: { id: string }): Promise<User | null> => {
          return context.providers.database.user.findUnique({
            where: {
              id: params.id,
            },
            // ✅ Incluir eventos para usuário específico
            include: {
              events: {
                orderBy: {
                  startDate: "asc",
                },
              },
            },
          });
        },
        create: async (input: CreateUserDTO): Promise<User> => {
          return context.providers.database.user.create({
            data: {
              name: input.name,
              picturePath: input.picturePath,
            },
            // ✅ Incluir eventos para consistência
            include: {
              events: {
                orderBy: {
                  startDate: "asc",
                },
              },
            },
          });
        },
        update: async (
          params: { id: string } & UpdateUserDTO
        ): Promise<User> => {
          const user = await context.providers.database.user.findUnique({
            where: { id: params.id },
          });
          if (!user) throw new Error("User not found");
          return context.providers.database.user.update({
            where: { id: params.id },
            data: {
              name: params.name,
              picturePath: params.picturePath,
            },
            // ✅ Incluir eventos para consistência
            include: {
              events: {
                orderBy: {
                  startDate: "asc",
                },
              },
            },
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.user.delete({
            where: { id: params.id },
          });
          return { id: params.id };
        },
      },
    };
  },
});
