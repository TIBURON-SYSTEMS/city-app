import z from "zod";

export const ChallengeFormSchema = z.object({
  label: z.string().min(1, {
    message: "Please add a label.",
  }),
  published: z.string({ required_error: "Please select an option" }),
  endDate: z.date({ required_error: "Challenge end date is required!" }),
  goal: z.coerce.number().min(1, {
    message: "Please add a goal number",
  }),
  product: z.string().min(1, {
    message: "Please add a product name",
  }),
  material: z.string({
    required_error: "Please select a material for the product",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(300, { message: "Description must be at least 300 characters." }),
});

export const BrandFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Brand name is required.",
    })
    .max(52, {
      message: "Brand name cannot exceed 52 characters.",
    }),
});

export const BrandProfileSchema = z.object({
  image: z.string().min(1, {
    message: "Please add an url for your image",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(300, { message: "Description must be at least 300 characters." }),
});

export type BrandFormData = z.infer<typeof BrandFormSchema>;
