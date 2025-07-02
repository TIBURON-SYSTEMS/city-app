import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function BrandDashboard() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  } else {
    const roles = (session.user.tiburonroles as string[]) || [];
    if (!roles.includes("brand")) {
      redirect("/unauthorized");
    }
  }

  return (
    <>
      <a href="/auth/logout">
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Logout
        </button>
      </a>
    </>
  );
}
