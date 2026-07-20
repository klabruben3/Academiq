import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold">Sign-in failed</h1>
      <p className="mt-2 text-muted-foreground">
        Something went wrong while signing you in. This can happen if the
        sign-in link expired or was already used.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Back to login
      </Link>
    </div>
  );
}