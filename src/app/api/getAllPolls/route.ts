import { NextResponse } from "next/server";

export async function GET() {
  try {
   
    const res = await fetch(
     `https://football.ogitechconsults.ng/public/api/v1/polls`, 
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
