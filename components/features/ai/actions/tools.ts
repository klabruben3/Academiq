import { tool } from "ai";
import { AddUserSchema } from "./schema";
import { insertModule } from "./helpers";

export const tools = {
  addModule: tool({
    description: "Adds module information to Supabase",
    inputSchema: AddUserSchema,
    execute: insertModule,
  }),
};
