import { THIRD_BASE_URL } from "@/constant/api.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing match basic stat id" },
        { status: 400 }
      );
    }

    const res = await fetch(
     `${THIRD_BASE_URL}${id}`, 
    );

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
