import { NextRequest, NextResponse } from "next/server";
import { createClaim } from "@/tools/DataManager";

export async function POST(request: NextRequest) {
    try {
        const response = await createClaim(request);
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}