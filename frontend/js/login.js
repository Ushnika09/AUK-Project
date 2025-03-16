document.addEventListener("DOMContentLoaded", () => {

  
  
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.btn-primary');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    const messageContainer = document.getElementById('message-container');
    const themeToggle = document.getElementById('theme-toggle');
  
    // Password visibility toggle
    const togglePassword = document.getElementById('toggle-password');
    togglePassword?.addEventListener('click', (e) => {
        e.preventDefault();
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.querySelector('i').className = 
            `fas fa-${type === 'password' ? 'eye' : 'eye-slash'}`;
        passwordInput.focus();
    });

    // Prevent toggle password button from taking focus
    togglePassword?.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });
  
    // Prevent form submission on Enter key unless focused on input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
        }
    });

    // Prevent theme toggle from submitting form
    themeToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        // Clear previous messages
        messageContainer.innerHTML = '';
  
        // Validate form
        const email = emailInput.value.trim();
        const password = passwordInput.value;
  
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
  
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
  
        // Password validation
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return;
        }
  
        try {
            // Show loading state only after validation passes
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            loadingSpinner.hidden = false;
  
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    remember: document.getElementById('remember').checked
                })
            });
  
            const data = await response.json();
  
            if (response.ok) {
                // Store auth data
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.role);
                
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect after success
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                throw new Error(data.message || 'Invalid credentials');
            }
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'block';
            loadingSpinner.hidden = true;
        }
    });
  
    function showMessage(message, type) {
        messageContainer.innerHTML = `
            <div class="message message-${type}">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                ${message}
            </div>
        `;
    }
  
    // Social login handlers
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            showMessage(`${button.textContent.trim()} login coming soon!`, 'info');
        });
    });
});

