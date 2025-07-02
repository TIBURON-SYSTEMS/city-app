import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import prisma from "../../../../prisma/db";
import ListAllChallenges from "@/components/brandDashboard/card-challenges";
import { Prisma } from "@/generated/prisma";

export default async function ListChallenges() {
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

  type BrandWithChallenges = Prisma.BrandGetPayload<{
    include: {
      challenges: true;
    };
  }>;

  const challengesData: BrandWithChallenges | null =
    await prisma.brand.findUnique({
      where: {
        id,
      },
      include: {
        challenges: true,
      },
    });

  if (!challengesData) return;

  return (
    <>
      <ListAllChallenges data={challengesData.challenges} />
    </>
  );
}
