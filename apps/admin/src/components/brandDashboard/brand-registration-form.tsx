"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { BrandFormData, BrandFormSchema } from "@/lib/schemas";
import { createBrand } from "@/app/brand-registration/[id]/actions";

export default function BrandForm({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(BrandFormSchema),
  });

  const onSubmit = async (data: BrandFormData) => {
    const action = await createBrand(data, id);

    if (action instanceof Error) {
      toast.error(`An error occurred! Please try again. (${action})`);
      return;
    }

    toast.success("You Registered a new brand");
    redirect(`/pending`);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <PlusCircle className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight">
          Register Your Brand
        </CardTitle>
        <CardDescription className="text-base">
          Enter your brand name to get started.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-3">
              Brand Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="My Awesome Brand"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-3">
          <Button type="submit">Create Brand</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
