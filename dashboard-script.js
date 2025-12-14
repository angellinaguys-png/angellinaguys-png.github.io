// Check if user is logged in
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

// Logout function
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Load statistics
function loadStatistics() {
    // Total koleksi
    const totalTopeng = database.topeng.length;
    document.getElementById('totalTopeng').textContent = totalTopeng;
    
    // Total daerah unik
    const daerahSet = new Set(database.topeng.map(t => t.daerah));
    document.getElementById('totalDaerah').textContent = daerahSet.size;
    
    // Total jenis unik
    const jenisSet = new Set(database.topeng.map(t => t.jenis));
    document.getElementById('totalJenis').textContent = jenisSet.size;
}

// Load recent collection (3 topeng terbaru)
function loadRecentCollection() {
    const recentContainer = document.getElementById('recentCollection');
    const recentTopeng = database.topeng.slice(-3).reverse(); // 3 terakhir
    
    if (recentTopeng.length === 0) {
        recentContainer.innerHTML = '<p style="text-align: center; color: #666;">Belum ada koleksi topeng.</p>';
        return;
    }
    
    recentContainer.innerHTML = '';
    
    recentTopeng.forEach(topeng => {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.innerHTML = `
            <h3>${topeng.nama}</h3>
            <span class="badge">${topeng.daerah}</span>
            <p><strong>Jenis:</strong> ${topeng.jenis}</p>
            <p><strong>Tahun:</strong> ${topeng.tahun || 'Tidak diketahui'}</p>
            <p><strong>Bahan:</strong> ${topeng.bahan || 'Tidak diketahui'}</p>
            <p>${topeng.deskripsi ? topeng.deskripsi.substring(0, 100) + '...' : 'Tidak ada deskripsi'}</p>
        `;
        recentContainer.appendChild(card);
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadStatistics();
    loadRecentCollection();
});