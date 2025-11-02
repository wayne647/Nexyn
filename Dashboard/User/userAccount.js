document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash && window.location.hash === '#userAccount') {
        localStorage.removeItem('currentUser');
        window.location.href = '/loginForm/loginAccount.html';
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '/loginForm/loginAccount.html';
        return;
    }

    let logoutTimer;
    function startLogoutTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
            localStorage.removeItem('currentUser');
            alert('Session expired. Please log in again.');
            window.location.href = '/loginForm/loginAccount.html';
        }, 50000);
    }

    function resetLogoutTimer() {
        startLogoutTimer();
    }

    startLogoutTimer();

    document.addEventListener('mousemove', resetLogoutTimer);
    document.addEventListener('keypress', resetLogoutTimer);
    document.addEventListener('click', resetLogoutTimer);
    document.addEventListener('scroll', resetLogoutTimer);

    window.addEventListener('hashchange', function() {
        if (window.location.hash && window.location.hash === '#userAccount') {
            window.location.hash = '';
            localStorage.removeItem('currentUser');
            window.location.href = '/loginForm/loginAccount.html';
        }
    });

    initializeProfileDropdown(currentUser);
    initializeButtons();

    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('dropdownMenu');
        const dropdownBtn = document.getElementById('profileDropdownBtn');
        
        if (!dropdownBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    function initializeProfileDropdown(user) { 
        document.getElementById('profileDropdownBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.classList.toggle('show');
        });
    }

    function initializeButtons() {
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            const getStartedBtn = heroSection.querySelector('.bg-blue-500');
            const viewPlansBtn = heroSection.querySelector('.bg-transparent');
            
            if (getStartedBtn) {
                getStartedBtn.addEventListener('click', function() {
                    document.getElementById('minecraft').scrollIntoView({ behavior: 'smooth' });
                });
            }
            
            if (viewPlansBtn) {
                viewPlansBtn.addEventListener('click', function() {
                    document.getElementById('minecraft').scrollIntoView({ behavior: 'smooth' });
                });
            }
        }

        const selectPlanButtons = document.querySelectorAll('.plan-card button');
        selectPlanButtons.forEach(button => {
            if (button.textContent.includes('Select Plan')) {
                button.addEventListener('click', function() {
                    alert('Plan selection feature coming soon!');
                });
            }
        });
    }

    window.openSettings = function() {
        alert('Settings feature coming soon!');
        document.getElementById('dropdownMenu').classList.remove('show');
    };

    window.logout = function() {
        clearTimeout(logoutTimer);
        localStorage.removeItem('currentUser');
        window.location.href = '/loginForm/loginAccount.html';
    };
});