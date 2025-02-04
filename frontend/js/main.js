// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add markers dynamically
const locations = [
    { lat: 51.51, lon: -0.08, description: 'Harassment reported here.', type: 'harassment', severity: 'high' },
    { lat: 51.49, lon: -0.1, description: 'Theft reported here.', type: 'theft', severity: 'medium' },
];

locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lon]).addTo(map)
        .bindPopup(loc.description);
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';

    // Save user preference in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Check for saved user preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

