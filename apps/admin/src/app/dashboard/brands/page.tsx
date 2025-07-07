import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { BrandsContent } from "@/components/dashboard/brands-content";
import prisma from "../../../../prisma/db";

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

  const allBrands = await prisma.brand.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      status: true,
      userId: true,
      user: {
        select: {
          email: true,
        },
      },
      _count: {
        select: {
          challenges: true,
          products: true,
        },
      },
    },
  });

  const user = session?.user
    ? {
        ...session.user,
        email: session.user.email ?? "",
      }
    : undefined;

  return <BrandsContent user={user} initialBrands={allBrands} />;
}
