// ================== FRONTEND: OTP Verification ==================
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const sendOTPBtn = document.getElementById('sendOTP');
    const verifyOTPBtn = document.getElementById('verifyOTP');
    const otpSection = document.getElementById('otpSection');
    const submitBtn = document.getElementById('submitBtn');

    sendOTPBtn.addEventListener('click', () => {
        // Simulate sending OTP
        alert('OTP sent to your phone number');
        otpSection.style.display = 'block';
        sendOTPBtn.style.display = 'none';
    });

    verifyOTPBtn.addEventListener('click', () => {
        // Simulate OTP verification
        alert('OTP verified');
        otpSection.style.display = 'none';
        submitBtn.style.display = 'block';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    });
});

document.getElementById('verifyOTP').addEventListener('click', () => {
    const userOTP = document.getElementById('otp').value;

    if (userOTP == localStorage.getItem('generatedOTP')) {
        alert('OTP verified successfully!');
        document.getElementById('otp').disabled = true;
        document.getElementById('verifyOTP').disabled = true;
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

// ================== BACKEND: User Registration ==================
const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'safehaven'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// User Registration API
app.post('/api/auth/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password before storing
        const hashedPassword = bcrypt.hashSync(password, 10);

        db.query('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Database error' });
                }
                res.json({ success: true, message: 'Registration successful' });
            });
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
