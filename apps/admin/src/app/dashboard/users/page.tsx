import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { UsersContent } from "@/components/dashboard/users-content";

export default async function UsersPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  } else {
    const roles = (session.user.tiburonroles as string[]) || [];
    if (!roles.includes("admin")) {
      redirect("/unauthorized");
    }
  }

  return <UsersContent />;
}
