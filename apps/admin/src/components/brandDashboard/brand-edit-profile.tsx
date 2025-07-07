"use client";
import { BrandProfileSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import BrandCardLayout from "./brand-card-layout";
import { SquarePen } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { editBrand } from "@/app/brand-dashboard/profile/[id]/edit/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BrandEditProfile({ brandId }: { brandId: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof BrandProfileSchema>>({
    resolver: zodResolver(BrandProfileSchema),
    defaultValues: {
      image: "",
    },
  });

  async function onSubmit(data: z.infer<typeof BrandProfileSchema>) {
    console.log(brandId);
    console.log(data);

    const action = await editBrand(brandId, data);
    if (action instanceof Error) {
      toast.error(`An error occurred! Please try again. (${action})`);
      return;
    }
    toast.success("You updated your brand profile");
    router.push(`/brand-dashboard/profile/${action.id}`);
  }

  return (
    <BrandCardLayout
      title="Edit Brand Prodile"
      icon={SquarePen}
      description="Edit your brand profile"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">
                  Description:
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a clear description of your brand"
                    className="min-h-[120px] resize-none border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  This will be the description of your brand in the participant
                  app
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">
                  Brand Image
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the url of your brand image"
                    className="border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  This will be the image of your brand in the participant app
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Separator className="bg-slate-200" />
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="submit"
              className="bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400"
            >
              Edit profile
            </Button>
          </div>
        </form>
      </Form>
    </BrandCardLayout>
  );
}
