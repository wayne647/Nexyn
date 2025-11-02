document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordIcon = togglePassword.querySelector('i');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordIcon.classList.toggle('fa-eye');
        passwordIcon.classList.toggle('fa-eye-slash');
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        
        let isValid = true;
        
        if (username === '') {
            usernameError.textContent = 'Username is required';
            isValid = false;
        } else if (username.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            isValid = false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        if (isValid) {
            const user = {
                id: Date.now(),
                username: username,
                email: email,
                password: password,
                role: 'user',
                createdAt: new Date().toISOString()
            };
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const emailExists = existingUsers.some(u => u.email === email);
            if (emailExists) {
                emailError.textContent = 'Email already registered';
                return;
            }
            const usernameExists = existingUsers.some(u => u.username === username);
            if (usernameExists) {
                usernameError.textContent = 'Username already taken';
                return;
            }
            existingUsers.push(user);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'loginForm/loginAccount.html';
            }
        }
    });
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fakeEvent = new Event('submit', { cancelable: true });
            form.dispatchEvent(fakeEvent);
        });
    });
});