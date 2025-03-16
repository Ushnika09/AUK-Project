const db = require("../config/db");

const ReportModel = {
    createReport: (reportData, callback) => {
        const sql = `INSERT INTO incident_reports 
            (incident_title, date_time, latitude, longitude, crime_type, description, severity, people_involved, injured, reported, anonymous, media_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, Object.values(reportData), callback);
    },

    getAllReports: (callback) => {
        db.query("SELECT * FROM incident_reports", callback);
    }
};

module.exports = ReportModel;
