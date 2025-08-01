import { z } from "zod";
import { igniter } from "@/igniter";
import { UserFeatureProcedure } from "../procedures/user.procedure";
// import { auth } from "@/features/admin/procedures/auth.procedure";

export const UserController = igniter.controller({
  name: "user",
  path: "/user",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [UserFeatureProcedure()],
      query: z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        search: z.string().optional(),
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.user.findMany(request.query);
        return response.success(result);
      },
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [UserFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.user.findOne(request.params);
        return response.success(result);
      },
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [UserFeatureProcedure()],
      body: z.object({
        name: z.string().min(1, "Name is required"),
        picturePath: z.string().nullable().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.user.create(request.body);
        return response.success(result);
      },
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [UserFeatureProcedure()],
      body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        picturePath: z.string().nullable().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.user.update({
          ...request.params,
          ...request.body,
        });
        return response.success(result);
      },
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [UserFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.user.delete(request.params);
        return response.success({
          message: "User deleted successfully",
          ...result, // Spread result which already contains { id: string }
        });
      },
    }),
  },
});
