"use server";

interface User {
  name: string;
  email: string;
  university: string,
  faculty: string;
  yearOfStudy: string;
}

export function signInWithPassword(email: string, password: string) {
  console.log(email, password);
}

export function signUpWithPassword(user: User & {password: string}) {
  console.log(user);
}

export function signInWithGoogle() {
  console.log("in with google");
}

export function signOut() {
  console.log("im signing out");
}
