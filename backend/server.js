const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Database Connection
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

// ✅ Log Incoming Requests for Debugging
app.use((req, res, next) => {
    console.log("📥 Incoming Request:", req.method, req.url);
    console.log("📦 Body:", req.body);
    next();
});

// ✅ Handle Incident Report Submission
app.post("/submit-report", upload.single("media"), (req, res) => {
    console.log("📥 Incoming Report Submission");

    try {
        console.log("📦 Request Body:", req.body);
        console.log("🖼 File Uploaded:", req.file ? req.file.filename : "No file");

        const { 
            incident_title, date_time, latitude, longitude, 
            crime_type, description, severity, people_involved, 
            injured, reported, anonymous 
        } = req.body;

        console.log("🔍 Extracted Data:", { 
            incident_title, date_time, latitude, longitude, 
            crime_type, description, severity, people_involved, 
            injured, reported, anonymous 
        });

        const peopleInvolvedInt = people_involved ? parseInt(people_involved, 10) : 0;
        
        // ✅ Store ENUM values as "yes" or "no" (not 1 or 0)
        const injuredEnum = injured === "yes" ? "yes" : "no";
        const reportedEnum = reported === "yes" ? "yes" : "no";
        const anonymousEnum = anonymous === "yes" ? "yes" : "no";
        const media_path = req.file ? req.file.path : null;

        const sql = `INSERT INTO incident_reports 
            (incident_title, date_time, latitude, longitude, crime_type, description, severity, people_involved, injured, reported, anonymous, media_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            incident_title, date_time, latitude, longitude,
            crime_type, description, severity, peopleInvolvedInt,
            injuredEnum, reportedEnum, anonymousEnum, media_path
        ];

        console.log("📝 SQL Query:", sql);
        console.log("📦 Query Values:", values);

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("❌ Database Insert Error:", err);
                console.error("📌 SQL Message:", err.sqlMessage);
                console.error("📌 SQL State:", err.sqlState);
                console.error("📌 Error Code:", err.errno);

                return res.status(500).json({
                    success: false,
                    error: "Database error",
                    details: err.sqlMessage
                });
            }
            console.log("✅ Report inserted successfully:", result);
            res.json({ success: true, message: "Report submitted successfully" });
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ success: false, error: "Server error", details: error.message });
    }
});

// ✅ Start Server
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
