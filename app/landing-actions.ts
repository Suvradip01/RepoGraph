"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { submitAnalysis, type FormState } from "@/app/(workspace)/actions";

export type LandingFormState = { error: string | null };

// From the marketing page. Signed-out users are sent to sign-in carrying the
// URL as a query parameter so the flow can pick it up after authentication.
// Signed-in users with an active organization go straight into analysis.
export async function submitFromLanding(
  _previous: LandingFormState,
  form: FormData
): Promise<LandingFormState> {
  const url = form.get("url");
  if (typeof url !== "string" || !url.trim()) {
    return { error: "Paste a GitHub repository URL" };
  }

  const { userId, orgId } = await auth();

  if (!userId) {
    // Preserve the URL so the dashboard can submit it after sign-in.
    const encoded = encodeURIComponent(url.trim());
    redirect(`/sign-in?redirect_url=${encodeURIComponent(`/dashboard?url=${encoded}`)}`);
  }

  if (!orgId) {
    // Signed in but no organization yet — go to /start, which resolves that.
    redirect("/start");
  }

  // Fully authenticated: reuse the workspace submit action.
  const result: FormState = await submitAnalysis({ error: null }, form);
  return result;
}
