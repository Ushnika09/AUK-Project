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

// Handle form submission for contact form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
    contactForm.reset();
});

// Filter incidents based on type and severity
const incidentTypeSelect = document.getElementById('incident-type');
const severityLevelSelect = document.getElementById('severity-level');
const searchBar = document.getElementById('search-bar');

incidentTypeSelect.addEventListener('change', filterIncidents);
severityLevelSelect.addEventListener('change', filterIncidents);
searchBar.addEventListener('input', filterIncidents);

function filterIncidents() {
    const type = incidentTypeSelect.value;
    const severity = severityLevelSelect.value;
    const searchQuery = searchBar.value.toLowerCase();

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    locations.forEach(loc => {
        if ((type === 'all' || loc.type === type) &&
            (severity === 'all' || loc.severity === severity) &&
            (searchQuery === '' || loc.description.toLowerCase().includes(searchQuery))) {
            L.marker([loc.lat, loc.lon]).addTo(map)
                .bindPopup(loc.description);
        }
    });
}

// Render comparison chart using Chart.js
const comparisonChartCtx = document.getElementById('comparison-chart').getContext('2d');

const comparisonChart = new Chart(comparisonChartCtx, {
    type: 'bar',
    data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Reported Crimes Against Women',
                data: [378277, 405861, 371503, 428278, 445256, 450000, 460000], // Hypothetical data for 2023 and 2024
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Estimated Total Crimes Against Women',
                data: [500000, 530000, 490000, 550000, 570000, 580000, 590000], // Hypothetical data for 2023 and 2024
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

