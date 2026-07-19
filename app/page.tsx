import { Academiq, LoadingScreen } from "@/components/layout";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: worker, error } = await supabase
    .from("workers")
    .select("id, 25")
    .single();

  if (worker) {
    console.error(worker);
  }
  if (error) {
    console.log(error);
  }
  const isAuth = false;

  return <>{isAuth ? <Academiq /> : <LoadingScreen />}</>;
}
