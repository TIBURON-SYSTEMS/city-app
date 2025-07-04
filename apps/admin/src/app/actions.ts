"use server";

import prisma from "../../prisma/db";

export async function addUsertoDb(email: string) {
  try {
    const newUser = prisma.user.create({ data: { email, role: "BRAND" } });
    return newUser;
  } catch (error) {
    console.error(error);
  }
}
