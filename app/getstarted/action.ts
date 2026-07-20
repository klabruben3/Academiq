"use server";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

interface UserShape {
  id?: string;
  name: string;
  email: string;
  university: string;
  faculty: string;
  yearOfStudy: string;
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  redirect("/");
}

export async function signUpWithPassword(
  user: UserShape & { password: string },
) {
  const supabase = await createClient();

  let tempUser: User | null = null;
  // sign up with password
  if (user.password.trim()) {
    const {
      data: { user: signedUpUser },
      error: signUpError,
    } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    
    if (signUpError || !signedUpUser) throw signUpError;
    tempUser = signedUpUser;
  }

  if(!tempUser || !user) return;

  // registers user to supabase
  const { error } = await supabase.from("users").insert({
    id: user.id ? user.id : tempUser.id,
    name: user.name,
    email: user.email,
    university: user.university,
    faculty: user.faculty,
    year_of_study: user.yearOfStudy,
  });

  if (error) throw error;

  redirect("/");
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) throw error;

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
