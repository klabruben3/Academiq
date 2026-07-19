// import { supabase } from "@/lib/supabase/client";
import { AddModuleInputProp, AddUserInputProp } from "./schema";

export async function insertModule(module: AddModuleInputProp) {
  console.log("module detected:", module);
}

export async function insertWorker({ name }: AddUserInputProp) {
  console.log("I got a name:", name);
}
