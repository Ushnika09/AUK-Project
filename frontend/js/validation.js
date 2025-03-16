class FormValidator {
    static EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
    static PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    static showError(inputElement, message) {
        const formGroup = inputElement.closest('.input-group');
        const errorDiv = formGroup.querySelector('.error-message') || 
                        this.createErrorElement(formGroup);
        errorDiv.textContent = message;
        inputElement.classList.add('invalid');
    }

    static showSuccess(inputElement) {
        const formGroup = inputElement.closest('.input-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) errorDiv.textContent = '';
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    }

    static createErrorElement(formGroup) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
        return errorDiv;
    }

    static validateEmail(email) {
        return this.EMAIL_REGEX.test(email.trim());
    }

    static validatePassword(password) {
        return this.PASSWORD_REGEX.test(password);
    }

    static validatePhone(phone) {
        return this.PHONE_REGEX.test(phone.trim());
    }

    static validateRequired(value) {
        return value.trim().length > 0;
    }
}