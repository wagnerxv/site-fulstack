import { igniter } from "@/igniter";
import type {
  Event,
  CreateEventDTO,
  UpdateEventDTO,
  EventQueryParams,
} from "../event.interface";

export const EventFeatureProcedure = igniter.procedure({
  name: "EventFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      event: {
        findMany: async (query: EventQueryParams): Promise<Event[]> => {
          return context.providers.database.event.findMany({
            where: query.search
              ? {
                  OR: [
                    { title: { contains: query.search } },
                    { description: { contains: query.search } },
                    { userId: { contains: query.search } },
                  ],
                }
              : undefined,
            skip: query.page
              ? (query.page - 1) * (query.limit || 10)
              : undefined,
            take: query.limit,
            orderBy: query.sortBy
              ? { [query.sortBy]: query.sortOrder || "asc" }
              : undefined,
              include:{
                user: true, // Include user details for each event
              }
          });
        },
        findOne: async (params: { id: string }): Promise<Event | null> => {
          return context.providers.database.event.findUnique({
            where: {
              id: params.id,
            },
          });
        },
        create: async (input: CreateEventDTO): Promise<Event> => {
          return context.providers.database.event.create({
            data: {
              title: input.title,
              description: input.description,
              startDate: input.startDate,
              endDate: input.endDate,
              color: input.color,
              userId: input.userId,
            },
          });
        },
        update: async (
          params: { id: string } & UpdateEventDTO
        ): Promise<Event> => {
          const event = await context.providers.database.event.findUnique({
            where: { id: params.id },
          });
          if (!event) throw new Error("Event not found");
          return context.providers.database.event.update({
            where: { id: params.id },
            data: {
              title: params.title,
              description: params.description,
              startDate: params.startDate,
              endDate: params.endDate,
              color: params.color,
              userId: params.userId,
            },
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.event.delete({
            where: { id: params.id },
          });
          return { id: params.id };
        },
      },
    };
  },
});
