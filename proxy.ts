import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// The marketing landing page is the only route a signed-out visitor may reach.
// Everything else — the workspace, analyses, start — stays behind Clerk.
const isPublic = createRouteMatcher(["/"]);

// Runs at the edge before every matched request. Signed-out visitors reach
// a protected route only after Clerk has had the chance to redirect them,
// so the page's HTML is never sent to an unauthenticated request.
export default clerkMiddleware((auth, request) => {
  if (!isPublic(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next internals and all static files unless they appear in the query.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
    // Clerk's own internal routes.
    "/__clerk/:path*",
  ],
};
