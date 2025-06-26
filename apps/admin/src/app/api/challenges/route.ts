import { NextResponse } from "next/server";
import { challenges } from "@/mocks/challenges";

export async function GET() {
  const response = NextResponse.json({ challenges });

  response.headers.set("Access-Control-Allow-Origin", "*"); // or specify your mobile app's domain
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}