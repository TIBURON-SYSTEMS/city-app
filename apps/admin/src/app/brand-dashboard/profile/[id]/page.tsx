import { Brand } from "@/generated/prisma";
import { auth0 } from "@/lib/auth0";
import { notFound, redirect } from "next/navigation";
import prisma from "../../../../../prisma/db";
import BrandProfileDetails from "@/components/brandDashboard/brand-profile-details";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return id;
}
export default async function ProfilePAge(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const brand: Brand | null = await prisma.brand.findUnique({
    where: { id },
  });

  if (!brand) return notFound();

  return <BrandProfileDetails data={brand} />;
}
