const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "safehaven"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection error:", err);
    } else {
        console.log("✅ Connected to MySQL Database.");
    }
});

module.exports = db;
