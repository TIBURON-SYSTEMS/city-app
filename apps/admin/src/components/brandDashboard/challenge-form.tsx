"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Package, Target } from "lucide-react";
import { format } from "date-fns";

import { createChallenge } from "@/app/brand-dashboard/add/actions";
import { ChallengeFormSchema } from "@/lib/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { redirect } from "next/navigation";

export default function ChallengeForm({ brand }: { brand: string }) {
  const form = useForm<z.infer<typeof ChallengeFormSchema>>({
    resolver: zodResolver(ChallengeFormSchema),
    defaultValues: {
      label: "",
      goal: 0,
      product: "",
    },
  });
  async function onSubmit(data: z.infer<typeof ChallengeFormSchema>) {
    const action = await createChallenge(data, brand);

    if (action instanceof Error) {
      toast.error(`An error occurred! Please try again. (${action})`);
      return;
    }

    toast.success("You submitted a new challenge");
    redirect(`/brand-dashboard/challenges/${action.id}`);
  }

  function handleCancel() {
    redirect("/brandDashboard");
  }
  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <Target className="h-6 w-6 text-black" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Create New Challenge
              </CardTitle>
            </div>
            <CardDescription className="text-slate-600">
              Set up a new challenge for your brand. Fill in the details below
              to get started.
            </CardDescription>
          </CardHeader>

          <Separator className="bg-slate-200" />

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-900">
                      Basic Information
                    </h3>
                    <p className="text-sm text-slate-600">
                      Essential details about your challenge
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem className="space-y-2 col-span-full">
                          <FormLabel className="text-sm font-medium text-slate-700">
                            Challenge Label
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter challenge label"
                              className="border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-slate-500">
                            This will be the main title visible to all users
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2">
                        <FormLabel className="text-sm font-medium text-slate-700">
                          Challenge End Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-slate-200 bg-white hover:bg-slate-50",
                                  !field.value && "text-slate-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white border-slate-200"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <= new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="text-xs text-slate-500">
                          Set when this challenge should end
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="bg-slate-200" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-900">
                      Challenge Details
                    </h3>
                    <p className="text-sm text-slate-600">
                      Configure the specifics of your challenge
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-slate-700">
                            Goal Target
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter a goal number"
                              className="border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-slate-500">
                            Set the target number for this challenge
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem className="space-y-2 ">
                          <FormLabel className="text-sm font-medium text-slate-700">
                            Product Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter a product name"
                              className="border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-slate-500">
                            Product is associated with this challenge
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-slate-700">
                          Material Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger className="border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400">
                              <SelectValue placeholder="Select material type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-200">
                            <SelectItem
                              value="plastic"
                              className="focus:bg-slate-100"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-500" />
                                Plastic
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="aluminium"
                              className="focus:bg-slate-100"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-500" />
                                Aluminium
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="glass"
                              className="focus:bg-slate-100"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-500" />
                                Glass
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="paper"
                              className="focus:bg-slate-100"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-500" />
                                Paper
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="cardboard"
                              className="focus:bg-slate-100"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-500" />
                                Cardboard
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="metal"
                              className="focus:bg-slate-100"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-500" />
                                Metal
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs text-slate-500">
                          Choose the primary material for your product
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-slate-700">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a clear overview of the challenge: goals, rules, and any special instructions..."
                            className="min-h-[120px] resize-none border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-400"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-slate-500">
                          Detailed information about the challenge requirements
                          and guidelines
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="bg-slate-200" />
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400"
                  >
                    Create Challenge
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
