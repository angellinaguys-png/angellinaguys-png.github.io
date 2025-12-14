// Check if user is logged in
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

// Logout function
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

let editMode = false;
let editId = null;

// Load data topeng ke tabel
function loadTopeng() {
    const tbody = document.getElementById('topengTable');
    tbody.innerHTML = '';
    
    if (database.topeng.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #666;">Belum ada data topeng</td></tr>';
        return;
    }
    
    database.topeng.forEach((topeng, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${topeng.nama}</td>
            <td>${topeng.daerah}</td>
            <td>${topeng.jenis}</td>
            <td>${topeng.tahun || '-'}</td>
            <td>${topeng.bahan || '-'}</td>
            <td>${topeng.deskripsi ? (topeng.deskripsi.length > 50 ? topeng.deskripsi.substring(0, 50) + '...' : topeng.deskripsi) : '-'}</td>
            <td>
                <button class="btn-edit" onclick="editTopeng(${topeng.id})">Edit</button>
                <button class="btn-delete" onclick="hapusTopeng(${topeng.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Form submit handler
document.getElementById('topengForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('namaTopeng').value.trim();
    const daerah = document.getElementById('asalDaerah').value.trim();
    const jenis = document.getElementById('jenis').value.trim();
    const deskripsi = document.getElementById('deskripsi').value.trim();
    const tahun = document.getElementById('tahunPembuatan').value;
    const bahan = document.getElementById('bahan').value.trim();
    
    if (!nama || !daerah || !jenis) {
        showMessage('error', 'Nama Topeng, Asal Daerah, dan Jenis harus diisi!');
        return;
    }
    
    if (editMode) {
        // Update data
        const index = database.topeng.findIndex(t => t.id === editId);
        if (index !== -1) {
            database.topeng[index] = {
                id: editId,
                nama: nama,
                daerah: daerah,
                jenis: jenis,
                deskripsi: deskripsi,
                tahun: tahun ? parseInt(tahun) : null,
                bahan: bahan
            };
            showMessage('success', 'Data berhasil diupdate!');
        }
    } else {
        // Tambah data baru
        const newId = database.topeng.length > 0 
            ? Math.max(...database.topeng.map(t => t.id)) + 1 
            : 1;
        
        database.topeng.push({
            id: newId,
            nama: nama,
            daerah: daerah,
            jenis: jenis,
            deskripsi: deskripsi,
            tahun: tahun ? parseInt(tahun) : null,
            bahan: bahan
        });
        showMessage('success', 'Data berhasil ditambahkan!');
    }
    
    saveDatabase();
    loadTopeng();
    resetForm();
});

// Edit topeng
function editTopeng(id) {
    const topeng = database.topeng.find(t => t.id === id);
    if (!topeng) return;
    
    editMode = true;
    editId = id;
    
    document.getElementById('namaTopeng').value = topeng.nama;
    document.getElementById('asalDaerah').value = topeng.daerah;
    document.getElementById('jenis').value = topeng.jenis;
    document.getElementById('deskripsi').value = topeng.deskripsi || '';
    document.getElementById('tahunPembuatan').value = topeng.tahun || '';
    document.getElementById('bahan').value = topeng.bahan || '';
    
    document.getElementById('btnText').textContent = '💾 Simpan Perubahan';
    document.getElementById('btnCancel').style.display = 'inline-block';
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hapus topeng
function hapusTopeng(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus topeng ini?')) {
        return;
    }
    
    database.topeng = database.topeng.filter(t => t.id !== id);
    saveDatabase();
    loadTopeng();
    showMessage('success', 'Data berhasil dihapus!');
}

// Cancel edit
function cancelEdit() {
    resetForm();
}

// Reset form
function resetForm() {
    document.getElementById('topengForm').reset();
    editMode = false;
    editId = null;
    document.getElementById('btnText').textContent = '+ Tambah Topeng';
    document.getElementById('btnCancel').style.display = 'none';
}

// Show message
function showMessage(type, message) {
    const successEl = document.getElementById('addSuccess');
    const errorEl = document.getElementById('addError');
    
    if (type === 'success') {
        successEl.textContent = message;
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
        setTimeout(() => successEl.style.display = 'none', 3000);
    } else {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
        setTimeout(() => errorEl.style.display = 'none', 3000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadTopeng();
});