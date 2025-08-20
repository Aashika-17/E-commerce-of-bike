// script.js
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const passwordInput = document.getElementById('password');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');
const successMessage = document.getElementById('successMessage');
const API_URL = 'http://localhost:5000/api';

// Password strength checker
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    passwordStrengthBar.className = 'password-strength-bar';
    if (password.length > 0) {
        if (strength <= 1) passwordStrengthBar.classList.add('strength-weak');
        else if (strength === 2) passwordStrengthBar.classList.add('strength-medium');
        else passwordStrengthBar.classList.add('strength-strong');
    }
});

// Validation helper
function validateField(fieldId, errorId, validationFn) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (!validationFn(field.value)) {
        error.classList.add('show');
        field.style.borderColor = '#ffd700';
        return false;
    } else {
        error.classList.remove('show');
        field.style.borderColor = '';
        return true;
    }
}

// Form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    let isValid = true;
    isValid &= validateField('firstName', 'firstNameError', val => val.trim().length > 0);
    isValid &= validateField('lastName', 'lastNameError', val => val.trim().length > 0);
    isValid &= validateField('email', 'emailError', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
    isValid &= validateField('password', 'passwordError', val => val.length >= 8);
    isValid &= validateField('confirmPassword', 'confirmPasswordError', val => val === document.getElementById('password').value && val.length > 0);
    isValid &= validateField('businessName', 'businessNameError', val => val.trim().length > 0);

    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    if (!termsCheckbox.checked) {
        termsError.classList.add('show');
        isValid = false;
    } else {
        termsError.classList.remove('show');
    }

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        businessName: document.getElementById('businessName').value,
        website: document.getElementById('website').value
    };

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('seller', JSON.stringify(data));
            successMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = 'index.html'; // change redirect here
            }, 1500);
        } else {
            alert(data.message || 'Registration failed');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Seller Account';
        }
    } catch (error) {
        alert('Network error. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Seller Account';
    }
});

// Input hover effects
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="url"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() { this.parentElement.style.transform = 'scale(1.02)'; });
    input.addEventListener('blur', function() { this.parentElement.style.transform = 'scale(1)'; });
});
