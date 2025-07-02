import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import prisma from "../../../../prisma/db";
import ChallengeForm from "@/components/brandDashboard/challenge-form";

export default async function AddChallengePage() {
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
    <>
      <ChallengeForm brand={id} />
    </>
  );
}
