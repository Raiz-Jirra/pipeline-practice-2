import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';

// MongoDB constants
const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbData";

export async function loginUser(request: NextRequest) {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();

        const body = await request.json();
        const { email, password } = body;

        const db = mongoClient.db(MONGO_DB_NAME);
        const users = db.collection("users");

        const user = await users.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false });
        }

        const match = await bcrypt.compare(password, user.passwordHash);

        if (!match) {
            return NextResponse.json({ success: false });
        }

        return NextResponse.json({
            success: true,
            role: user.role
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });

    } finally {
        mongoClient.close();
    }
}


