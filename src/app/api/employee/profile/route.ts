import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserProfile } from "@/tools/DataManager";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 use JWT instead of query param
    const profile = await getUserProfile(decoded.userId);

    return NextResponse.json({ success: true, profile });
}