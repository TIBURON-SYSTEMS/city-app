"use client";

import BrandCardLayout from "./brand-card-layout";
import {
  Swords,
  CalendarDays,
  CalendarX2,
  Goal,
  Milk,
  Package,
  MessageSquareQuote,
} from "lucide-react";
import moment from "moment";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChallengeWithProduct } from "@/app/brand-dashboard/challenges/[id]/page";
import {
  deleteChallenge,
  publishChallenge,
} from "@/app/brand-dashboard/challenges/[id]/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface ChallengeDetailsProps {
  data: ChallengeWithProduct;
}

export default function ChallengeDetails({ data }: ChallengeDetailsProps) {
  async function handlePublish() {
    const action = await publishChallenge(data.id);

    if (action instanceof Error) {
      toast.error(`An error occurred! Please try again. (${action})`);
      return;
    }
    toast.success("Challenge is now available to users");
  }

  async function handleDelete() {
    const action = await deleteChallenge(data.id);

    if (action instanceof Error) {
      toast.error(`An error occurred! Please try again. (${action})`);
      return;
    }
    toast.warning("Challenge deleted successfully");
    redirect("/brand-dashboard/challenges");
  }

  console.log(data);
  return (
    <BrandCardLayout title={data.label} icon={Swords} status={data.status}>
      <div>
        <div>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-slate-900">
                Basic Information
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays />
              <p className="text-base font-medium text-slate-700">
                Created: {moment(data.createdAt).format("MMMM-Do-YY")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarX2 />
              <p className="text-base font-medium text-slate-700">
                Remaining days: {moment(data.endDate).endOf("day").fromNow()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <MessageSquareQuote />
              <p className="text-base font-medium text-slate-700 max-w-3xl">
                Description: {data.description}
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-slate-200 mb-5 mt-5" />

        <h3 className="text-lg font-medium text-slate-900">Condition</h3>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Goal />
            <p className="text-base font-medium text-slate-700">
              Goal: {data.goal}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Milk />
            <p className="text-base font-medium text-slate-700 capitalize">
              Product: {data.products[0].label}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Package />
            <p className="text-base font-medium text-slate-700 capitalize">
              Material: {data.products[0].material}
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-200 mb-5 mt-5" />

      <div className="flex justify-end space-x-4 pt-4">
        <Button onClick={handleDelete} type="button" variant="destructive">
          Delete
        </Button>
        <Button
          onClick={handlePublish}
          type="button"
          disabled={data.status === "active" ? true : false}
        >
          Publish
        </Button>
      </div>
    </BrandCardLayout>
  );
}
