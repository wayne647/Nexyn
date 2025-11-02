document.addEventListener('DOMContentLoaded', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const adminUser = {
        id: 1,
        username: 'kyuu',
        email: 'kyuu@gmail.com',
        password: 'kyuukatzuki',
        role: 'admin',
        createdAt: new Date().toISOString()
    };

const adminExists = users.some(u => u.email === adminUser.email);
    if (!adminExists) {
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
    console.log('All users in system:', users);

   const form = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordIcon = togglePassword.querySelector('i');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordIcon.classList.toggle('fa-eye-slash');
        passwordIcon.classList.toggle('fa-eye');
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        emailError.textContent = '';
        passwordError.textContent = '';
        
        let isValid = true;
        
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
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
                if (user.role === 'admin') {
                    window.location.href = "/Dashboard/Admin/adminAccount.html";
                } else {
                    window.location.href = "/Dashboard/User/userAccount.html";
                }
                form.reset();
            } else {
               emailError.textContent = 'Invalid email or password';
                passwordError.textContent = 'Invalid email or password';
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