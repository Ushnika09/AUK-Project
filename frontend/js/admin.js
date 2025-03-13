// Example: Fetch and display reports or users
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is an admin (you can implement this logic)
    const isAdmin = true; // Replace with actual admin check

    if (!isAdmin) {
        // Redirect non-admin users
        window.location.href = 'index.html';
    }

    // Fetch and display data (e.g., reports, users)
    fetchReports();
    fetchUsers();
});

function fetchReports() {
    // Fetch reports from the server
    console.log('Fetching reports...');
}

function fetchUsers() {
    // Fetch users from the server
    console.log('Fetching users...');
}
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

