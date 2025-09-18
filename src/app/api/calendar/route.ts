import { THIRD_BASE_URL } from "@/constant/api.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${THIRD_BASE_URL}calendar`, {
      // You can add headers if required
      cache: "no-store", // prevent Next.js from caching the API response
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from third-party API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
