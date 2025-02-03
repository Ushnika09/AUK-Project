document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in
    let isLoggedIn = localStorage.getItem("loggedInUser");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");

    if (isLoggedIn) {
        loginBtn.innerText = "Dashboard";
        loginBtn.href = "dashboard.html";
        registerBtn.innerText = "Logout";
        registerBtn.href = "#";
        registerBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.reload();
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Initialize Map
    let map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Dummy Unsafe Location Marker
    L.marker([28.6139, 77.2090]).addTo(map)  // Delhi Example
        .bindPopup("Reported Unsafe Location: Dark street with no security.")
        .openPopup();
});
