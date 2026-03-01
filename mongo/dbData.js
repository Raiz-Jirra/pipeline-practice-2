db.users.drop();
db.claims.drop();
db.claimCategories.drop();

const adminId = ObjectId();
const ripleyId = ObjectId();
const chrisId = ObjectId();
const sarahId = ObjectId();
const jamesId = ObjectId();
const mariaId = ObjectId();
const danielId = ObjectId();

db.users.insert([
  {
    _id: adminId,
    firstName: "Admin",
    lastName: "User",
    email: "admin@test.com",
    passwordHash: "$2b$10$xXjv0Wldd2fDBX.Ezo2UnOgcWmLhtRnmILetJGBdnLR/OEpmm4Uoa",
    role: "ADMIN",
    createdAt: new Date()
  },
  {
    _id: ripleyId,
    firstName: "Ellen",
    lastName: "Ripley",
    email: "ellen.ripley@test.com",
    DOB: new Date("1998-04-21"),
    address: {
      street: "123 Rue Montier",
      city: "Montreal",
      province: "QC",
      postalCode: "H2X 1Y4",
      country: "Canada"
    },
    passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
    role: "EMPLOYEE",
    createdAt: new Date()
  },
  {
    _id: chrisId,
    firstName: "Chris",
    lastName: "Baron",
    email: "chris123@test.com",
    DOB: new Date("2001-03-21"),
    address: {
      street: "47 Oxford Street",
      city: "Halifax",
      province: "NS",
      postalCode: "B2N 1Y9",
      country: "Canada"
    },
    passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
    role: "EMPLOYEE",
    createdAt: new Date()
  },
  {
    _id: sarahId,
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah.connor@test.com",
    DOB: new Date("1995-08-12"),
    address: {
      street: "15 King Street",
      city: "Toronto",
      province: "ON",
      postalCode: "M5H 2N2",
      country: "Canada"
    },
    passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
    role: "EMPLOYEE",
    createdAt: new Date()
  },
  {
    _id: jamesId,
    firstName: "James",
    lastName: "Carter",
    email: "james.carter@test.com",
    DOB: new Date("1990-11-05"),
    address: {
      street: "88 Elm Street",
      city: "Calgary",
      province: "AB",
      postalCode: "T2P 1J9",
      country: "Canada"
    },
    passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
    role: "EMPLOYEE",
    createdAt: new Date()
  },
  {
    _id: mariaId,
    firstName: "Maria",
    lastName: "Lopez",
    email: "maria.lopez@test.com",
    DOB: new Date("1997-02-18"),
    address: {
      street: "22 Lakeshore Blvd",
      city: "Vancouver",
      province: "BC",
      postalCode: "V5K 0A1",
      country: "Canada"
    },
    passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
    role: "EMPLOYEE",
    createdAt: new Date()
  },
  {
    _id: danielId,
    firstName: "Daniel",
    lastName: "Smith",
    email: "daniel.smith@test.com",
    DOB: new Date("1993-06-30"),
    address: {
      street: "101 Main Street",
      city: "Ottawa",
      province: "ON",
      postalCode: "K1A 0B1",
      country: "Canada"
    },
    passwordHash: "$2b$10$P6TYf8XjzTtuDECKpA/46euImibazFDxsI3e3t4uH2GVwrs4a5ArS",
    role: "EMPLOYEE",
    createdAt: new Date()
  }
]);


db.claims.insert([
  {
    claimId: "CLM-001",
    employeeId: ripleyId,
    date: new Date("2026-02-01"),
    category: "TRAVEL",
    description: "Off-world travel expenses",
    amount: 2000,
    receipts: ["flight.jpg", "taxi.png"],
    travelDetails: {
      startLocation: "Earth",
      endLocation: "LV-426",
      estimatedMileage: 3400
    },
    medicalDetails: null,
    status: "APPROVED",
    createdAt: new Date()
  },
  {
    claimId: "CLM-002",
    employeeId: ripleyId,
    date: new Date("2026-02-05"),
    category: "MEDICAL",
    description: "Exposure screening",
    amount: 1500,
    receipts: ["medical.jpg"],
    travelDetails: null,
    medicalDetails: { specialExposure: true },
    status: "PENDING",
    createdAt: new Date()
  },
  {
    claimId: "CLM-003",
    employeeId: chrisId,
    date: new Date("2026-02-10"),
    category: "FOOD",
    description: "Conference dinner",
    amount: 85,
    receipts: [],
    travelDetails: null,
    medicalDetails: null,
    status: "PENDING",
    createdAt: new Date()
  }
]);


db.claimCategories.drop();

db.claimCategories.insert([
  { key: "FOOD", label: "Food", isDefault: true },
  { key: "TRAVEL", label: "Travel", isDefault: true },
  { key: "MEDICAL", label: "Medical", isDefault: true },
  { key: "LODGING", label: "Lodging", isDefault: true }
]);