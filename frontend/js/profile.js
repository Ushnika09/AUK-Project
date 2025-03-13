// Fetch User Profile
async function fetchProfile() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Please log in to view your profile.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('/api/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();

        // Display Profile Details
        document.getElementById('profile-name').textContent = data.name;
        document.getElementById('profile-email').textContent = data.email;
        document.getElementById('profile-phone').textContent = data.phone;

        // Display Submitted Reports
        const reportsList = document.getElementById('reports-list');
        reportsList.innerHTML = data.reports.map(report => `
            <tr>
                <td>${report.lat}, ${report.lon}</td>
                <td>${report.description}</td>
                <td>${report.severity}</td>
                <td>${report.status}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error(error);
        alert('Failed to load profile.');
    }
}

// Edit Profile
document.getElementById('edit-profile').addEventListener('click', () => {
    // Redirect to an edit profile page or show a modal
    alert('Edit profile functionality coming soon!');
});

// Load Profile on Page Load
fetchProfile();