import { Prisma } from "@/generated/prisma";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import prisma from "../../../prisma/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type UserWithBrand = Prisma.UserGetPayload<{
  include: {
    brand: true;
  };
}>;

export default async function BrandDashboard() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const userInDb: UserWithBrand | null = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      brand: true,
    },
  });

  if (
    !userInDb ||
    userInDb.role !== "BRAND" ||
    userInDb.brand?.status !== "ACTIVE"
  ) {
    return redirect("/pending");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        {`Welcome ${userInDb.brand.name}`}
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        You can now start to manage challenges and rewards
      </p>
      <Button variant="destructive">
        <Link href="/auth/logout">Logout</Link>
      </Button>
    </div>
  );
}
