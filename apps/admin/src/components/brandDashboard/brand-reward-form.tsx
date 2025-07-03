"use client";

import { Gift } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BrandCardLayout from "./brand-card-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { createReward } from "@/app/brand-dashboard/challenges/[id]/reward/actions";

const formSchema = z.object({
  rewardName: z.string().min(1, {
    message: "Reward name is required.",
  }),
  rewardValue: z.coerce.number().min(1, {
    message: "Reward value must be at least 1.",
  }),
});

interface BrandRewardFormProps {
  challengeId: string;
}

export default function BrandRewardForm({ challengeId }: BrandRewardFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rewardName: "",
      rewardValue: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const action = await createReward({
      label: data.rewardName,
      amount: data.rewardValue,
      challengeId: challengeId,
    });

    if (action instanceof Error) {
      toast.error(`An error occurred! Please try again. (${action})`);
      return;
    }

    toast.success("Reward added successfully!");
    redirect(`/brand-dashboard/challenges/${challengeId}`);
  }

  return (
    <BrandCardLayout
      title="Add reward"
      icon={Gift}
      description="This reward will be visible to users once the challenge is active."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rewardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a name for the reward</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reward name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rewardValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter reward value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </BrandCardLayout>
  );
}
