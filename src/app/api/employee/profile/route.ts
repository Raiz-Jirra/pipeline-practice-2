import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserProfile } from "@/tools/DataManager";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decoded: any;

        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await getUserProfile(decoded.userId);

        return NextResponse.json(user);

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}