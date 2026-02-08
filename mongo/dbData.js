db.users.drop();
db.claims.drop();

// USERS
db.users.insertMany([
    {
        firstName: "Admin",
        lastName: "User",
        email: "admin@test.com",
        passwordHash: "$2b$10$exampleAdminHash",
        role: "ADMIN",
        createdAt: new Date()
    },
    {
        firstName: "Ellen",
        lastName: "Ripley",
        email: "ellen.ripley@test.com",
        passwordHash: "$2b$10$exampleEmployeeHash",
        role: "EMPLOYEE",
        createdAt: new Date()
    }
]);

// const ellen = db.users.findOne({ email: "ellen.ripley@test.com" });

db.claims.insertMany([
    {
        claimId: "CLM-001",
        // employeeId: ellen._id,
        category: "Travel",
        amount: 2000,
        description: "Off-world travel expenses",
        receipt: "receipt-001.jpg",
        medicalClaim: false,
        status: "Approved",
        createdAt: new Date()
    },
    {
        claimId: "CLM-002",
        // employeeId: ellen._id,
        category: "Lodging",
        amount: 1500,
        description: "Station lodging",
        receipt: "receipt-002.jpg",
        medicalClaim: false,
        status: "Pending",
        createdAt: new Date()
    }
]);
