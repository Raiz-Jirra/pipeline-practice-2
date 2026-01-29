// Mongo shell commands here to seed MongoDB database
// ...
db.users.insertOne({
    firstName: "Test",
    lastName: "Admin",
    email: "admin@test.com",
    passwordHash: "$2b$10$/wIrKGTWyHK8VBHhw7.KzeTqdUZ74ArRyJ9YbHjCzjLmx9hz1qUBm",
    role: "admin",
    createdAt: new Date()
})

