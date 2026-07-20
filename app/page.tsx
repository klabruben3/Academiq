import { Academiq } from "@/components/layout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log("server user:", user);
  
  if (error || !user) {
    redirect("/getstarted");
  }

  return <Academiq />;
}
