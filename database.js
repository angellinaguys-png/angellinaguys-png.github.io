// Database Management
let database = {
    users: [
        { 
            username: 'admin', 
            password: 'admin123',
            nama: 'Administrator'
        }
    ],
    topeng: [
        {
            id: 1,
            nama: 'Topeng Panji',
            daerah: 'Jawa Timur',
            jenis: 'Topeng Tari',
            deskripsi: 'Topeng yang melambangkan karakter kesatria yang halus, bijaksana, dan tampan dalam cerita Panji. Digunakan dalam pertunjukan Topeng Dalang.',
            tahun: 1950,
            bahan: 'Kayu Pule'
        },
        {
            id: 2,
            nama: 'Topeng Barong',
            daerah: 'Bali',
            jenis: 'Topeng Sakral',
            deskripsi: 'Topeng ritual yang melambangkan kebaikan dalam pertarungan melawan Rangda. Memiliki hiasan yang sangat mewah dengan bulu dan ornamen emas.',
            tahun: 1980,
            bahan: 'Kayu Pule'
        },
        {
            id: 3,
            nama: 'Topeng Cirebon Panji',
            daerah: 'Jawa Barat',
            jenis: 'Topeng Tari',
            deskripsi: 'Salah satu dari 5 topeng utama Cirebon yang menggambarkan karakter Panji dengan wajah halus dan mata setengah tertutup.',
            tahun: 1965,
            bahan: 'Kayu Waru'
        },
        {
            id: 4,
            nama: 'Topeng Klana',
            daerah: 'Jawa Barat',
            jenis: 'Topeng Tari',
            deskripsi: 'Topeng yang menggambarkan raja yang angkuh dan pemarah dalam cerita Cirebon. Memiliki mata melotot dan warna merah.',
            tahun: 1970,
            bahan: 'Kayu Waru'
        },
        {
            id: 5,
            nama: 'Topeng Reog Dadak Merak',
            daerah: 'Jawa Timur',
            jenis: 'Topeng Pertunjukan',
            deskripsi: 'Topeng besar dengan mahkota bulu merak yang sangat berat, simbol kekuatan dalam Reog Ponorogo. Beratnya bisa mencapai 50-60 kg.',
            tahun: 1975,
            bahan: 'Kayu Jati'
        },
        {
            id: 6,
            nama: 'Topeng Hudoq',
            daerah: 'Kalimantan Timur',
            jenis: 'Topeng Ritual',
            deskripsi: 'Topeng tradisional suku Dayak yang digunakan dalam upacara untuk memohon kesuburan tanaman. Memiliki ciri khas ornamen alami.',
            tahun: 1985,
            bahan: 'Kayu Ulin'
        }
    ]
};

// Load data dari localStorage
function loadDatabase() {
    const saved = localStorage.getItem('topengDB');
    if (saved) {
        database = JSON.parse(saved);
    } else {
        // Jika belum ada data, simpan data awal
        saveDatabase();
    }
}

// Save data ke localStorage
function saveDatabase() {
    localStorage.setItem('topengDB', JSON.stringify(database));
}

// Initialize database saat halaman dimuat
loadDatabase();