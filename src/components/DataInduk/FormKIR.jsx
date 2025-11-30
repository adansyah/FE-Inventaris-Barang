// FormKIR.jsx
import React, { useState, useEffect } from 'react';
// Asumsi PRIMARY_COLOR sudah diimport dari constants
// import { PRIMARY_COLOR } from '../constants'; 
const PRIMARY_COLOR = 'indigo'; // Definisi dummy jika constants tidak ada

// --- DATA DUMMY (Simulasi Data KIB B dan Ruangan dari Data Induk) ---
const KIB_B_DATA_DUMMY = [
    {
        id: 101, 
        nama_barang: 'Mobil Dinas Sedan', 
        merek: 'Toyota Camry', 
        tahun_perolehan: 2020, 
        kode_barang: '1.03.01.02.001',
        ukuran: '2500 CC', 
        bahan: 'Besi/Logam',
        harga_perolehan: 450000000,
        no_seri_pabrik: 'PBRK001'
    },
    {
        id: 102, 
        nama_barang: 'Komputer PC Staf', 
        merek: 'HP ProDesk', 
        tahun_perolehan: 2022, 
        kode_barang: '1.03.02.04.005',
        ukuran: 'Tower', 
        bahan: 'Plastik/Logam',
        harga_perolehan: 12000000,
        no_seri_pabrik: 'PC-2022-005'
    },
    {
        id: 103, 
        nama_barang: 'Mesin Fotocopy Digital', 
        merek: 'Canon iR', 
        tahun_perolehan: 2021, 
        kode_barang: '1.03.01.02.010',
        ukuran: 'Heavy Duty', 
        bahan: 'Logam',
        harga_perolehan: 85000000,
        no_seri_pabrik: 'MFP-C-010'
    },
];

const RUANGAN_DATA_DUMMY = [
    { id: 'R01', nama: 'Ruang Kepala Divisi' },
    { id: 'R02', nama: 'Ruang Staf 1' },
    { id: 'R03', nama: 'Ruang Arsip' },
];
// --------------------------------------------------------------------------

const FormKIR = ({ onSave, onCancel }) => {
    const [selectedKibId, setSelectedKibId] = useState('');
    const [formData, setFormData] = useState({
        // Field Baru
        lokasi_ruangan: '', 
        
        // Field KIB (diisi otomatis)
        kib_id_sumber: '',
        nama_barang: '',
        merek_model: '',
        tahun_perolehan: new Date().getFullYear().toString(),
        kode_barang: '',
        
        // Field Input KIR
        jenis: 'KIR',
        jumlah_barang: 1,
        keadaan_barang: 'Baik',
        keterangan: '',
        
        // Field lainnya
        harga_perolehan: '',
        no_seri_pabrik: '',
        ukuran: '',
        bahan: '',

        // 🔹 Field tambahan untuk gambar & QR
        foto_barang_base64: '',   // gambar disimpan sebagai base64
    });

    // --- useEffect untuk Mengisi Data Saat KIB Dipilih ---
    useEffect(() => {
        if (selectedKibId) {
            const selectedItem = KIB_B_DATA_DUMMY.find(item => item.id === parseInt(selectedKibId));
            if (selectedItem) {
                setFormData(prev => ({
                    ...prev,
                    kib_id_sumber: selectedItem.id,
                    nama_barang: selectedItem.nama_barang,
                    merek_model: selectedItem.merek,
                    tahun_perolehan: selectedItem.tahun_perolehan.toString(),
                    kode_barang: selectedItem.kode_barang,
                    harga_perolehan: selectedItem.harga_perolehan.toString(),
                    no_seri_pabrik: selectedItem.no_seri_pabrik,
                    ukuran: selectedItem.ukuran,
                    bahan: selectedItem.bahan,
                    jumlah_barang: 1, 
                    keadaan_barang: 'Baik',
                    keterangan: '',
                }));
            }
        } else {
            // Reset jika KIB tidak dipilih
            setFormData(prev => ({
                ...prev,
                kib_id_sumber: '',
                nama_barang: '',
                merek_model: '',
                tahun_perolehan: new Date().getFullYear().toString(),
                kode_barang: '',
                harga_perolehan: '',
                no_seri_pabrik: '',
                ukuran: '',
                bahan: '',
            }));
        }
    }, [selectedKibId]);

    // --- Handlers ---
    const handleKibSelect = (e) => {
        setSelectedKibId(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 🔹 Handler untuk choose file gambar (disimpan base64, tidak ditampilkan di tabel)
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setFormData(prev => ({ ...prev, foto_barang_base64: '' }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                foto_barang_base64: reader.result, // Data URL base64
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.lokasi_ruangan || !formData.kib_id_sumber) {
            alert("Harap pilih Ruangan dan Barang KIB B terlebih dahulu.");
            return;
        }

        // 🔹 Siapkan data lengkap yang akan ditampilkan di halaman /barcode
        const barcodeData = {
            type: 'KIR',
            kode_barang: formData.kode_barang,
            nama_barang: formData.nama_barang,
            lokasi_ruangan: formData.lokasi_ruangan,
            tahun_perolehan: formData.tahun_perolehan,
            merek_model: formData.merek_model,
            no_seri_pabrik: formData.no_seri_pabrik,
            kondisi: formData.keadaan_barang,
            jumlah_barang: formData.jumlah_barang,
            keterangan: formData.keterangan,
            foto_base64: formData.foto_barang_base64 || null,
        };

        // 🔹 QR akan berisi URL ke /barcode dengan payload data di query string
        const qrUrl = `${window.location.origin}/barcode?payload=${encodeURIComponent(
            JSON.stringify(barcodeData)
        )}`;

        // Data yang disimpan ke DataIndukContent
        const dataToSave = {
            nama_barang: formData.nama_barang,
            merek_tipe: formData.merek_model, 
            tahun_perolehan: formData.tahun_perolehan,
            kode_barang: formData.kode_barang,
            jumlah: formData.jumlah_barang,
            kondisi: formData.keadaan_barang,
            keterangan: formData.keterangan,
            lokasi: formData.lokasi_ruangan,
            harga_perolehan: formData.harga_perolehan,

            // Data teknis lain
            no_seri: formData.no_seri_pabrik, 
            ukuran: formData.ukuran, 
            bahan: formData.bahan,
            jenis: formData.jenis,

            // 🔹 simpan gambar & URL QR
            foto_barang_base64: formData.foto_barang_base64 || null,
            qr_payload: qrUrl,
        };

        onSave(dataToSave);
    };

    return (
        <div> 
            <h2 className={`text-2xl font-bold text-${PRIMARY_COLOR}-700 mb-6 border-b pb-2`}>
                Input Data Kartu Inventaris Ruangan (KIR) Berdasarkan KIB B
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Bagian 1: Pemilihan Sumber Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md bg-gray-50">
                    <div>
                        <label className="block text-sm font-bold text-gray-800">
                            1. Pilih Ruangan <span className="text-red-500">*</span>
                        </label>
                        <select 
                            required 
                            name="lokasi_ruangan" 
                            value={formData.lokasi_ruangan} 
                            onChange={handleChange} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 bg-white"
                        >
                            <option value="">-- Pilih Lokasi Ruangan --</option>
                            {RUANGAN_DATA_DUMMY.map(r => (
                                <option key={r.id} value={r.nama}>{r.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-800">
                            2. Pilih Barang KIB B <span className="text-red-500">*</span>
                        </label>
                        <select 
                            required 
                            value={selectedKibId} 
                            onChange={handleKibSelect} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 bg-white"
                        >
                            <option value="">-- Pilih Aset KIB B --</option>
                            {KIB_B_DATA_DUMMY.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.nama_barang} ({item.kode_barang})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Bagian 1b: Upload Foto Barang */}
                <div className="border p-4 rounded-md bg-white">
                    <label className="block text-sm font-bold text-gray-800">
                        3. Upload Foto Barang (Opsional, digunakan saat scan QR)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                        Foto ini <span className="font-semibold">tidak akan tampil di tabel</span>, tetapi disimpan di data KIR
                        dan akan muncul di halaman detail saat QR discan.
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>

                {/* Bagian 2: Data Otomatis (Readonly) dari KIB B */}
                <h3 className="text-lg font-semibold text-gray-700 pt-4 border-t">
                    Data Aset KIB B (Terisi Otomatis)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Merk/Type</label>
                        <input
                            readOnly
                            value={formData.merek_model || '-'}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tahun Perolehan</label>
                        <input
                            readOnly
                            value={formData.tahun_perolehan || '-'}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kode Barang</label>
                        <input
                            readOnly
                            value={formData.kode_barang || '-'}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                        <input
                            readOnly
                            value={formData.nama_barang || '-'}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-100 text-gray-600"
                        />
                    </div>
                </div>

                {/* Bagian 3: Input Khusus KIR */}
                <h3 className="text-lg font-semibold text-gray-700 pt-4 border-t">
                    Input Detail Inventaris Ruangan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jumlah Barang (di Ruangan ini)
                        </label>
                        <input 
                            required 
                            name="jumlah_barang" 
                            type="number" 
                            min="1" 
                            value={formData.jumlah_barang} 
                            onChange={handleChange} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" 
                            disabled={!selectedKibId}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kondisi Barang</label>
                        <select 
                            name="keadaan_barang" 
                            value={formData.keadaan_barang} 
                            onChange={handleChange} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                            disabled={!selectedKibId}
                        >
                            <option value="Baik">Baik</option>
                            <option value="Kurang Baik">Kurang Baik</option>
                            <option value="Rusak Berat">Rusak Berat</option>
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Harga Perolehan (Readonly)
                        </label>
                        <input
                            readOnly
                            value={
                                formData.harga_perolehan
                                    ? `Rp ${Number(formData.harga_perolehan).toLocaleString('id-ID')}`
                                    : '-'
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-100 text-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Keterangan (Mutasi/Lainnya)
                    </label>
                    <textarea 
                        name="keterangan" 
                        value={formData.keterangan} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" 
                        rows="2" 
                        placeholder="Tambahkan keterangan spesifik untuk inventaris ruangan ini..."
                        disabled={!selectedKibId}
                    ></textarea>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end space-x-3 pt-6 border-t mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit" 
                        disabled={!formData.lokasi_ruangan || !selectedKibId}
                        className={`px-6 py-2 bg-${PRIMARY_COLOR}-600 text-white rounded-lg hover:bg-${PRIMARY_COLOR}-700 shadow-md transition disabled:bg-gray-400`}
                    >
                        Simpan KIR
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormKIR;
