// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Cari user di database
    const user = database.users.find(u => 
        u.username === username && u.password === password
    );
    
    if (user) {
        // Login berhasil
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('nama', user.nama);
        
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login gagal
        const errorMsg = document.getElementById('loginError');
        errorMsg.style.display = 'block';
        
        // Hapus pesan error setelah 3 detik
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }
});