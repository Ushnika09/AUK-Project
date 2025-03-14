// document.getElementById('reportForm').addEventListener('submit', (e) => {
//     e.preventDefault();

//     const latitude = document.getElementById('latitude').value;
//     const longitude = document.getElementById('longitude').value;
//     const description = document.getElementById('description').value;
//     const severity = document.getElementById('severity').value;

//     // Simulate report submission (replace with backend API call in production)
//     alert(`Report submitted!\nLatitude: ${latitude}\nLongitude: ${longitude}\nDescription: ${description}\nSeverity: ${severity}`);
// });


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reportForm");
    const getLocationBtn = document.getElementById("getLocationBtn");

    // Get user's location
    getLocationBtn.addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    document.getElementById("latitude").value = position.coords.latitude.toFixed(6);
                    document.getElementById("longitude").value = position.coords.longitude.toFixed(6);
                },
                (error) => {
                    alert("Error fetching location. Ensure location access is enabled.");
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // Form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const reportData = {};
        formData.forEach((value, key) => {
            reportData[key] = value;
        });

        // Simulating form submission (Replace this with an API call)
        console.log("Report Submitted:", reportData);
        alert("Report submitted successfully!");

        // Clear form fields after submission
        form.reset();
    });
});
