import { auth0 } from "@/lib/auth0";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { redirect } from "next/navigation";
import prisma from "../../../prisma/db";

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

  // TODO: Substitue this with a query to the database
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/users`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  const recentChallenges = await prisma.challenge.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      brand: true,
      _count: {
        select: {
          participations: true,
          rewards: true,
        },
      },
    },
  });

  const stats = {
    totalUsers: data.stats?.totalUsers || 0,
    totalBrands: data.stats?.totalBrands || 0,
    totalChallenges: data.stats?.totalChallenges || 0,
    totalProducts: data.stats?.totalProducts || 0,
    itemsRecycled: data.stats?.itemsRecycled || 0,
    totalBins: data.stats?.totalBins || 0,
    totalDisposals: data.stats?.totalDisposals || 0,
  };

  const user = session?.user
    ? {
        ...session.user,
        email: session.user.email ?? "",
      }
    : undefined;

  return (
    <DashboardContent
      user={user}
      stats={stats}
      recentChallenges={recentChallenges}
    />
  );
}
