document.getElementById('reportForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const description = document.getElementById('description').value;
    const severity = document.getElementById('severity').value;

    // Simulate report submission (replace with backend API call in production)
    alert(`Report submitted!\nLatitude: ${latitude}\nLongitude: ${longitude}\nDescription: ${description}\nSeverity: ${severity}`);
});