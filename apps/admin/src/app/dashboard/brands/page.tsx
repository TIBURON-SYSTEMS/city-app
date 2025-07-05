import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { BrandsContent } from "@/components/dashboard/brands-content";

export default async function BrandsPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  } else {
    const roles = (session.user.tiburonroles as string[]) || [];
    if (!roles.includes("admin")) {
      redirect("/unauthorized");
    }
  }

  return <BrandsContent />;
}
