document.addEventListener("DOMContentLoaded", function () {
    console.log("Auth script loaded!");

    // Handle Login Form Submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (data.success) {
                    localStorage.setItem("loggedInUser", JSON.stringify(data.user));
                    alert("Login Successful!");
                    window.location.href = "home.html"; // Redirect after login
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("Error logging in. Try again later.");
            }
        });
    }

    // Handle Logout (if user is logged in)
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        let isLoggedIn = localStorage.getItem("loggedInUser");

        if (isLoggedIn) {
            loginBtn.innerText = "Logout";
            loginBtn.href = "#";
            loginBtn.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                alert("Logged out successfully!");
                window.location.reload();
            });
        }
    }
});
