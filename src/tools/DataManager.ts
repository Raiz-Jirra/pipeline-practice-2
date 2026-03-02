
import bcrypt from "bcrypt";
import { MongoClient, ObjectId } from "mongodb";
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
        const DOB = sanitizeHtml(body.dob);
        const address = {
            street: sanitizeHtml(body.street),
            city: sanitizeHtml(body.city),
            province: sanitizeHtml(body.province),
            postalCode: sanitizeHtml(body.postalCode),
            country: sanitizeHtml(body.country)
        };

        // hash password
        const passwordHash = await bcrypt.hash(password, 10);

        const db = mongoClient.db(MONGO_DB_NAME);
        const users = db.collection("users");

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const result = await users.insertOne({
            firstName,
            lastName,
            email,
            DOB: new Date(DOB),
            address,
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

        allUsers = await users.find().sort({ role: 1 }).toArray();

        return allUsers.map(user => ({
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            date: user.createdAt.toISOString().split("T")[0]
        }));

    } catch (error: any) {
        console.log(`Error : ${error.message}`);
        throw error;
    } finally {
        await mongoClient.close();
    }

}

export async function getAdminClaims() {
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

        return claims.map((claim) => ({
            _id: claim._id.toString(),
            claimId: claim.claimId,
            category: claim.category,
            description: claim.description,
            amount: claim.amount,
            status: claim.status,
            date: claim.date?.toISOString(),
            createdAt: claim.createdAt?.toISOString(),
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

// Show cliams table for enployees -- Robert Jones
export async function getEmployeeClaims() {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db(MONGO_DB_NAME);
        const claims = db.collection("claims");

        const claimsData = await claims.find({}).toArray();

        // Map Database fields to component expectations
        const formattedClaims = claimsData.map(claim => ({
            id: claim.claimId,
            date: claim.createdAt.toISOString().split('T')[0],
            category: claim.category,
            amount: claim.amount,
            status: claim.status.toLowerCase(),
            description: claim.description
        }));

        return formattedClaims;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await mongoClient.close();
    }

}

export async function deleteUser(request: NextRequest, id: string) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect();

        const userId: ObjectId = new ObjectId(sanitizeHtml(id));

        const db = mongoClient.db(MONGO_DB_NAME);
        const users = db.collection("users");

        const result = await users.deleteOne({ "_id": userId })

        if (result.deletedCount <= 0) {
            return NextResponse.json({ error: "No user found with ID" }, { status: 404 });
        } else {
            return NextResponse.json(result, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        mongoClient.close();
    }
}



export async function addCategory(request: NextRequest) {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const body = await request.json();

        const rawName = body.name;

        const categoryName = sanitizeHtml(rawName.trim());

        const db = mongoClient.db(MONGO_DB_NAME);
        const collection = db.collection("claimCategories");

        const existing = await collection.findOne({ key: categoryName.toUpperCase() });

        if (existing) {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 }
            );
        }

        await collection.insertOne({ key: categoryName.toUpperCase(), label: categoryName, isDefault: false, createdAt: new Date() });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await mongoClient.close();
    }
}


export async function getCategories() {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();

        const db = mongoClient.db(MONGO_DB_NAME);
        const collection = db.collection("claimCategories");

        const categories = await collection
            .find({})
            .sort({ isDefault: -1, label: 1 })
            .toArray();

        return categories.map(category => ({
            id: category._id.toString(),
            key: category.key,
            label: category.label,
            isDefault: category.isDefault ?? false,
            date: category.createdAt ? category.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));

    } catch (error: any) {
        console.error("Error fetching categories:", error.message);
        throw error;
    } finally {
        await mongoClient.close();
    }
}

export async function deleteCategory(request: NextRequest, id: string) {
    const mongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db(MONGO_DB_NAME);

        const categories = db.collection("claimCategories");
        const claims = db.collection("claims");

        const category = await categories.findOne({
            _id: new ObjectId(id)
        });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (category.isDefault) {
            return NextResponse.json({ error: "Default categories cannot be deleted" }, { status: 400 }
            );
        }

        const claimExists = await claims.findOne({ category: category.key });

        if (claimExists) {
            return NextResponse.json(
                { error: "Category is in use by existing claims and cannot be deleted" },
                { status: 400 }
            );
        }

        await categories.deleteOne({ _id: category._id });

        return NextResponse.json({ success: true }, { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }
        );
    } finally {
        await mongoClient.close();
    }
}


