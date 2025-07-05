import { auth0 } from "@/lib/auth0";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  } else {
    const roles = (session.user.tiburonroles as string[]) || [];
    if (!roles.includes("admin")) {
      redirect("/unauthorized");
    }
  }
  //
  // return <DashboardContent user={session?.user} />;
  return <DashboardContent />;
}
