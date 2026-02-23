import { NextResponse } from "next/server";
import { getEmployeeClaims } from "@/tools/DataManager";

export async function GET() {
    try {
        const claims = await getEmployeeClaims();

        return NextResponse.json({
            success: true,
            claims
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}