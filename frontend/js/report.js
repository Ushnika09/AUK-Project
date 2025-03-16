document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reportForm");
    const getLocationBtn = document.getElementById("getLocationBtn");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");

    // 🗺️ Get user's live location
    getLocationBtn.addEventListener("click", function () {
        if (!navigator.geolocation) {
            alert("❌ Geolocation is not supported by your browser.");
            return;
        }

        getLocationBtn.textContent = "Fetching...";
        getLocationBtn.disabled = true; // Disable button while fetching

        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitudeInput.value = position.coords.latitude.toFixed(6);
                longitudeInput.value = position.coords.longitude.toFixed(6);

                getLocationBtn.textContent = "Location Fetched ✅";
                getLocationBtn.style.backgroundColor = "#4CAF50"; // Success color
            },
            (error) => {
                console.error("❌ Geolocation error:", error);

                let errorMessage = "❌ Error fetching location. ";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += "Please enable location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage += "Request timed out. Try again.";
                        break;
                    default:
                        errorMessage += "An unknown error occurred.";
                }

                alert(errorMessage);
                getLocationBtn.textContent = "Get Live Location";
                getLocationBtn.disabled = false; // Re-enable for retry
            }
        );
    });

    // 📝 Form Submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("🚀 Form submitted! Fetch request is about to start...");

        const formData = new FormData(form);

        // 🔄 Fix 'dateTime' -> 'date_time' if needed
        if (formData.has("dateTime")) {
            formData.append("date_time", formData.get("dateTime"));
            formData.delete("dateTime");
        }

        console.log("📝 Form Data Entries:");
        formData.forEach((value, key) => console.log(`${key}: ${value}`));

        fetch("http://localhost:3000/submit-report", {
            method: "POST",
            body: formData,
        })
        .then(response => {
            console.log("📡 Fetch request sent. Awaiting response...");
            return response.json();
        })
        .then(data => {
            console.log("📡 Server Response:", data);

            if (data.success) {
                alert("✅ Report submitted successfully!");
                form.reset();
                getLocationBtn.textContent = "Get Live Location"; // Reset button
                getLocationBtn.style.backgroundColor = ""; // Reset color
                getLocationBtn.disabled = false; // Re-enable button
            } else {
                alert("❌ Error submitting report: " + (data.error || "Unknown error"));
                console.error("❌ Error Details:", data.details || "No details provided.");
            }
        })
        .catch(error => {
            console.error("❌ Fetch Error:", error);
            alert("❌ An error occurred. Please try again.");
        });
    });
});
