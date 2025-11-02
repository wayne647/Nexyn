document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = '/loginForm/loginAccount.html';
        return;
    }

    loadUsersData();

document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('dashboardBtn').addEventListener('click', dashboard)
     document.getElementById('cancelAddUser').addEventListener('click', hideAddUserModal);
    document.getElementById('saveNewUser').addEventListener('click', saveNewUser);

    function loadUsersData() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tableBody = document.getElementById('usersTableBody');
        
        tableBody.innerHTML = '';

        updateStats(users);

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.username}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        ${user.role}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="editUser(${user.id})" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900 ${user.id === currentUser.id ? 'hidden' : ''}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function updateStats(users) {
        const totalUsers = users.length;
        const totalAdmins = users.filter(user => user.role === 'admin').length;
        const totalRegularUsers = totalUsers - totalAdmins;
        
        const today = new Date().toDateString();
        const todayRegistrations = users.filter(user => 
            new Date(user.createdAt).toDateString() === today
        ).length;

        
    }

    function showAddUserModal() {
        document.getElementById('addUserModal').classList.remove('hidden');
    }

    function hideAddUserModal() {
        document.getElementById('addUserModal').classList.add('hidden');
        document.getElementById('addUserForm').reset();
    }

    function saveNewUser() {
        const username = document.getElementById('newUsername').value.trim();
        const email = document.getElementById('newEmail').value.trim();
        const password = document.getElementById('newPassword').value;
        const role = document.getElementById('newRole').value;

        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === email)) {
            alert('Email already exists');
            return;
        }

        if (users.some(user => user.username === username)) {
            alert('Username already exists');
            return;
        }

        const newUser = {
            id: Date.now(),
            username,
            email,
            password,
            role,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        hideAddUserModal();
        loadUsersData();
        alert('User added successfully!');
    }

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/loginForm/loginAccount.html';
    }
    
    function dashboard() {
        window.location.href = "/Dashboard/User/userAccount.html"
    }

    window.editUser = function(userId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === userId);
        
        if (user) {
            const newRole = prompt('Enter new role (admin/user):', user.role);
            if (newRole && (newRole === 'admin' || newRole === 'user')) {
                user.role = newRole;
                localStorage.setItem('users', JSON.stringify(users));
                loadUsersData();
                alert('User role updated successfully!');
            }
        }
    };

    window.deleteUser = function(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(user => user.id !== userId);
            localStorage.setItem('users', JSON.stringify(users));
            loadUsersData();
            alert('User deleted successfully!');
        }
    };
});