import { Brand } from "@/generated/prisma";
import BrandCardLayout from "./brand-card-layout";
import { CalendarDays, FileUser, MessageSquareQuote } from "lucide-react";
import moment from "moment";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function BrandProfileDetails({ data }: { data: Brand }) {
  return (
    <BrandCardLayout
      title={`${data.name} Profile`}
      status={data.status}
      icon={FileUser}
      description="View your brand profile and click on edit to modify it"
    >
      <div className="space-y-3">
        <div className="size-72 grid place-content-center w-full">
          {data.logoUrl ? (
            <Image
              src={data.logoUrl}
              alt={`Logo from ${data.name}`}
              className="rounded-md object-cover"
              width={300}
              height={300}
            />
          ) : (
            <p>No image</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays />
          <p className="text-base font-medium text-slate-700">
            Created: {moment(data.createdAt).format("MMMM-Do-YY")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquareQuote />
          <p className="text-base font-medium text-slate-700 max-w-3xl">
            Description: {data.description || "No description, please add it"}
          </p>
        </div>

        <Separator className="bg-slate-200 mb-5 mt-5" />

        <div className="flex gap-4 w-full">
          <Button type="button" className="ml-auto ">
            <Link href={`/brand-dashboard/profile/${data.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>
    </BrandCardLayout>
  );
}
