// Simulate admin actions
document.querySelectorAll('.report-management button').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Action performed: ${button.textContent}`);
    });
});

document.querySelectorAll('.user-management button').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Action performed: ${button.textContent}`);
    });
});