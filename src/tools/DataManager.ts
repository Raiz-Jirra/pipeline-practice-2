import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import sanitizeHtml from 'sanitize-html';
import { NextRequest, NextResponse } from 'next/server';

// MongoDB constants
const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017";
const MONGO_DB_NAME: string = "dbData";

export async function loginUser(request: NextRequest) {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();

        const body = await request.json();
        body.email = sanitizeHtml(body.email);
        body.password = sanitizeHtml(body.password);


        const email = body.email;
        const password = body.password;

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


export async function addUser(request: NextRequest) {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const body = await request.json();

        // sanitize inputs
        const firstName = sanitizeHtml(body.firstName);
        const lastName = sanitizeHtml(body.lastName);
        const email = sanitizeHtml(body.email);
        const password = sanitizeHtml(body.password);

        // const firstName = body.firstName;
        // const lastName = body.lastName;
        // const email = body.email;
        // const password = body.password;

        // hash password
        const passwordHash = await bcrypt.hash(password, 10);

        const db = mongoClient.db(MONGO_DB_NAME);
        const users = db.collection("users");

        const result = await users.insertOne({
            firstName,
            lastName,
            email,
            passwordHash,
            role: "EMPLOYEE",
            createdAt: new Date()
        });

        if (!result.insertedId) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        return NextResponse.json({ success: true });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    } finally {
        await mongoClient.close();
    }
}

