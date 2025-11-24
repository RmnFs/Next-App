"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  if (status === "loading")
    return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          Sign in to FoodHub
        </h1>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-400 transition"
        >
          Continue with Google
        </button>
      </div>
    </section>
  );
}