document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const otpForm = document.getElementById("otp-form");
    const sendOtpBtn = document.getElementById("send-otp");

    // Step 1: Send OTP (Before Registration)
    sendOtpBtn.addEventListener("click", async function () {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !email || !phone || !password) {
            alert("All fields are required before sending OTP.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone })
            });

            const data = await response.json();
            if (response.ok) {
                alert("OTP sent successfully to Email & SMS!");
                registrationForm.classList.add("hidden"); // Hide registration form
                otpForm.classList.remove("hidden"); // Show OTP form
            } else {
                alert(data.message || "Failed to send OTP.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });

    // Step 2: Verify OTP & Complete Registration
    otpForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const otp = document.getElementById("otp").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, username, phone, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("OTP verified successfully! Account created.");
                window.location.href = "login.html"; // Redirect to login page
            } else {
                alert(data.message || "OTP verification failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });

    // Handle Login
    document.getElementById("login-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Both fields are required.");
            return;
        }

        // Simulate backend verification
        const registeredUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(registeredUser)); // Save logged-in user
            window.location.href = "home.html"; // Redirect to home after successful login
        } else {
            alert("Invalid email or password.");
        }
    });
});
