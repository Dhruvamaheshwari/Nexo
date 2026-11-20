import { NextResponse } from "next/server";
import { validateApiAuth } from "@/lib/auth-utils";
import { getMaintenanceStats } from "@/services/maintenance.service";

// GET /api/maintenance/stats - Maintenance statistics (Admin only)
export async function GET() {
  try {
    const authResult = await validateApiAuth(["ADMIN"]);
    if ("response" in authResult) {
      return authResult.response;
    }

    const stats = await getMaintenanceStats();

    return NextResponse.json({
      status: "success",
      stats,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}

