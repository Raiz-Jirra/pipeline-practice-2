import { NextResponse, NextRequest } from "next/server";
import { getEmployeeClaims } from "@/tools/DataManager";

export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

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