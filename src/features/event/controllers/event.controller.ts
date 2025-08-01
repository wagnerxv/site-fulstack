import { z } from "zod";
import { igniter } from "@/igniter";
import { EventFeatureProcedure } from "../procedures/event.procedure";
// import { auth } from "@/features/admin/procedures/auth.procedure";

// Zod schema for EventColor enum
const EventColorEnum = z.enum([
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "gray",
]);

export const EventController = igniter.controller({
  name: "event",
  path: "/event",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [EventFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        search: z.string().optional(),
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.event.findMany(request.query);
        return response.success(result);
      },
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [EventFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.event.findOne(request.params);
        return response.success(result);
      },
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [EventFeatureProcedure()],
      body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        color: EventColorEnum.optional().default("blue"),
        userId: z.string().min(1, "User ID is required"),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.event.create({
          ...request.body,
          startDate: request.body.startDate.toISOString(),
          endDate: request.body.endDate.toISOString(),
          color: request.body.color || "blue",
        });
        return response.success(result);
      },
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [EventFeatureProcedure()],
      body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        color: EventColorEnum.optional(),
        userId: z.string().min(1, "User ID is required").optional(),
      }),
      handler: async ({ request, response, context }) => {
        // Extrair as propriedades que não precisam de conversão
        const { startDate, endDate, ...otherFields } = request.body;

        // Preparar os dados com conversão correta de datas
        const updateData = {
          ...request.params,
          ...otherFields,
          // Converter startDate para string apenas se existir
          ...(startDate && { startDate: startDate.toISOString() }),
          // Converter endDate para string apenas se existir
          ...(endDate && { endDate: endDate.toISOString() }),
        };

        const result = await context.event.update(updateData);
        return response.success(result);
      },
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [EventFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.event.delete(request.params);
        return response.success(null);
      },
    }),
  },
});
