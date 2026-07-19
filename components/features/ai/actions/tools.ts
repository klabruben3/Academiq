import { tool } from "ai";
import { AddModuleSchema, AddUserSchema } from "./schema";
import { insertModule, insertWorker } from "./helpers";

export const tools = {
  addModule: tool({
    description: "Adds module information to Supabase",
    inputSchema: AddModuleSchema,
    execute: insertModule,
  }),
  addUser: tool({
    description: "Add user to Supabase",
    inputSchema: AddUserSchema,
    execute: insertWorker,
  }),
};
