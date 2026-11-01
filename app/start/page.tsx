import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Activate } from "./activate";

export default async function StartPage() {
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (orgId) redirect("/dashboard");

  return (
    <div className="flex flex-1 items-center justify-center">
      <Activate />
    </div>
  );
}
