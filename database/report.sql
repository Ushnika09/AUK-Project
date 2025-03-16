CREATE DATABASE IF NOT EXISTS safehaven;

USE safehaven;

CREATE TABLE IF NOT EXISTS incident_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incident_title VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    crime_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('high', 'medium', 'low') NOT NULL,
    people_involved INT NOT NULL,
    injured ENUM('yes', 'no') NOT NULL,
    reported ENUM('yes', 'no') NOT NULL,
    anonymous ENUM('yes', 'no') NOT NULL,
    media_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);