import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET () {
  try {
    const bins = await prisma.bin.findMany()

    const res = NextResponse.json(bins)
    res.headers.set("Access-Control-Allow-Origin", "*"); 
    return res
  } catch (error) {
     console.error("GET bins error", error);
    return NextResponse.json(
      { error: "Server Error" },
    )
  }
}