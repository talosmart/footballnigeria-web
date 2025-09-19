import { BASE_URL } from "@/constant/api.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
   
    const res = await fetch(
     `${BASE_URL}polls?featured=true`, 
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch polls" },
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
