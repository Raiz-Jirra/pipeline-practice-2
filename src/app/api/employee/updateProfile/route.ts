import { NextRequest, NextResponse } from "next/server";
import { updateUserProfile } from "@/tools/DataManager";

export async function POST(request: NextRequest) {
    try {
        // Delegate to DataManager function
        const response = await updateUserProfile(request);
        return response;
    } catch (error: any) {
        // Handle errors
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
