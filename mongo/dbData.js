db.users.drop();

// USERS
db.users.insertMany([
    {
        firstName: "Admin",
        lastName: "User",
        email: "admin@test.com",
        passwordHash: "$2b$10$xXjv0Wldd2fDBX.Ezo2UnOgcWmLhtRnmILetJGBdnLR/OEpmm4Uoa",
        role: "ADMIN",
        createdAt: new Date()
    },
    {
        firstName: "Ellen",
        lastName: "Ripley",
        email: "ellen.ripley@test.com",
        passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
        role: "EMPLOYEE",
        createdAt: new Date()
    }
]);


db.claims.drop();
db.claims.insertMany([
    {
        claimId: "CLM-001",
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
        category: "Lodging",
        amount: 1500,
        description: "Station lodging",
        receipt: "receipt-002.jpg",
        medicalClaim: false,
        status: "Pending",
        createdAt: new Date()
    },

    {
        claimId: "CLM-003",
        category: "Medical (Facehugger Exposure)",
        amount: 1500,
        description: "Expose to Facehugger",
        receipt: "receipt-003.jpg",
        medicalClaim: true,
        status: "Rejected",
        createdAt: new Date()
    }
]);

db.claimCategories.insertMany([
    {
        key: "FOOD",
        label: "Food",
        isDefault: true
    },
    {
        key: "TRAVEL",
        label: "Travel",
        isDefault: true
    },
    {
        key: "MEDICAL",
        label: "Medical",
        isDefault: true
    },
    {
        key: "LODGING",
        label: "Lodging",
        isDefault: true
    }
]);

