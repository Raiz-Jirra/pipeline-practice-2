import { NextRequest, NextResponse } from "next/server";
import { getUserProfile } from "@/tools/DataManager";

export async function GET(request: NextRequest) {
    try {
        // Extract userId from URL query parameters
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        // Validation: userId is required
        if (!userId) {
            return NextResponse.json(
                { error: "User ID required" },
                { status: 400 }
            );
        }

        const profile = await getUserProfile(userId);
        return NextResponse.json({ success: true, profile });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
