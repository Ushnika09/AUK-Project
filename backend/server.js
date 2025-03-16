require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ CORS Security Settings
app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5501"], // Allow both
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));


// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File Upload Configuration (Limit & Type)
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) {
            return cb(new Error("Only images and videos are allowed"));
        }
        cb(null, true);
    }
});

// ✅ Database Connection (Using Environment Variables)
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "safehaven"
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
        
        // ✅ Store ENUM values as "yes" or "no"
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

        db.execute(sql, values, (err, result) => {
            if (err) {
                console.error("❌ Database Insert Error:", err);
                return res.status(500).json({
                    success: false,
                    error: "Database error",
                    details: err.message
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
