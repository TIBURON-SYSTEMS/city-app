import { Prisma } from "@/generated/prisma";

export type UserWithBrand = Prisma.UserGetPayload<{
  include: {
    brand: true;
  };
}>;
