import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { BrandDetails } from "@/components/dashboard/brand-details";
import prisma from "../../../../../prisma/db";
import { count } from "console";

type Params = Promise<{ id: string }>;

export default async function BrandDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;

  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  } else {
    const roles = (session.user.tiburonroles as string[]) || [];
    if (!roles.includes("admin")) {
      redirect("/unauthorized");
    }
  }

  const brand = await prisma.brand.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true,
          createdAt: true,
        },
      },
      challenges: {
        select: {
          id: true,
          label: true,
          status: true,
          endDate: true,
          _count: {
            select: {
              participations: true,
              rewards: true,
            },
          },
        },
      },
      products: true,
      _count: {
        select: {
          challenges: true,
          products: true,
        },
      },
    },
  });

  if (!brand) {
    redirect("/dashboard/brands");
  }

  return <BrandDetails brand={brand} />;
}
