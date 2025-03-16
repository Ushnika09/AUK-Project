// Simulate OTP sending and verification
let generatedOTP = null;

document.getElementById('sendOTP').addEventListener('click', async () => {
    const phone = document.getElementById('phone').value;

    if (!phone) {
        alert('Please enter your phone number.');
        return;
    }

    // Simulate sending OTP (replace with Twilio API in production)
    generatedOTP = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    alert(`OTP sent to ${phone}: ${generatedOTP}`);

    // Show OTP section
    document.getElementById('otpSection').style.display = 'block';
    document.getElementById('sendOTP').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'block';
});

document.getElementById('verifyOTP').addEventListener('click', () => {
    const userOTP = document.getElementById('otp').value;

    if (userOTP == generatedOTP) {
        alert('OTP verified successfully!');
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

// Handle form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            alert(`Registration failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
});