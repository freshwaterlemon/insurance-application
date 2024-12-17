"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function GoogleLogin(data) {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    if (isRedirectError(error)) {
      console.error("Standard Redirect Error:", error);
      throw error;
    }
  }
  return { error: "Invalid login" };
}
