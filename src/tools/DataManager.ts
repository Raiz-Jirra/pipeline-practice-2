import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import sanitizeHtml from 'sanitize-html';
import { NextRequest, NextResponse } from 'next/server';

// MongoDB constants
const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017";
const MONGO_DB_NAME: string = "dbData";


// ------login and registration handlers------
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
            role: user.role,
            userId: user._id.toString()
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

// ------read handlers------
export async function getUsers() {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    let allUsers: any[];
    try {
        await mongoClient.connect();

        const db = mongoClient.db(MONGO_DB_NAME);
        const users = db.collection("users");

        allUsers = await users.find().toArray();

    } catch (error: any) {
        console.log(`Error : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return allUsers;
}

export async function getClaims() {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    let claims: any[];
    try {
        await mongoClient.connect();

        const db = mongoClient.db(MONGO_DB_NAME);


        claims = await db.collection("claims").aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employee"
                }
            }, {
                $unwind: "$employee"
            }
        ]).toArray();

        console.log(claims);
        return claims.map((claim) => ({
            _id: claim._id.toString(),
            claimId: claim.claimId,
            category: claim.category,
            description: claim.description,
            amount: claim.amount,
            status: claim.status,
            date: claim.date?.toISOString(),
            creadtedAt: claim.createdAt?.toISOString(),
            firstName: claim.employee.firstName,
            lastName: claim.employee.lastName
        }));


    } catch (error: any) {
        console.log(`Error : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }
}



