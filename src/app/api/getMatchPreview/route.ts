import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing match preview id" },
        { status: 400 }
      );
    }

    const res = await fetch(
     `http://api.footballnigeria.com/preview/${id}`, 
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
