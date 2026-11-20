import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json(
      {
        status: "success",
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: errorMessage,
      },
      { status: 503 }
    );
  }
}

