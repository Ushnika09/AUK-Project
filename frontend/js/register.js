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
document.getElementById('registerForm').addEventListener('submit', (e) => {
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

    // Simulate registration (replace with backend API call in production)
    alert(`Registration successful!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
});