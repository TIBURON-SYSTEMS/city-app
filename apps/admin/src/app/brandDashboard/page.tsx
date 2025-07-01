import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import ChallengeForm from "@/components/brandDashboard/challenge-form";
import prisma from "../../../prisma/db";

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

  const userWithBrand = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { brand: true },
  });

  if (!userWithBrand) return;

  if (!userWithBrand.brand) return;

  const id = userWithBrand.brand.id;

  return (
    <main>
      <ChallengeForm brand={id} />
      <a href="/auth/logout">
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Logout
        </button>
      </a>
    </main>
  );
}
