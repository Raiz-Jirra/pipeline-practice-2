import { MongoClient, InsertOneResult, UpdateResult, ObjectId, DeleteResult, Collection } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';

// MongoDB constants
const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbData";
const MONGO_COLLECTION_USERS: string = "users";

export async function getUser(email: string) {
    let client: MongoClient = new MongoClient(MONGO_URL);

    try {
        await client.connect();

        const db = client.db(MONGO_DB_NAME);
        const users = db.collection(MONGO_COLLECTION_USERS);

        const user = await users.findOne({ email });

        return user;
    } finally {
        await client.close();
    }
}