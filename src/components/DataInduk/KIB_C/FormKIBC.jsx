// FormKIBC.jsx
import React, { useState } from 'react';

const FormKIBC = ({ onSave, onCancel }) => {
    // State untuk menampung input KIB C
    const [formData, setFormData] = useState({
        // Field Umum
        nama_barang: '',
        kode_barang: '',
        nomor_register: '',
        nilai_perolehan: '', 
        tahun_perolehan: new Date().getFullYear().toString(),
        keterangan: '',
        kibType: 'C', // Identifier KIB

        // Field Spesifik KIB C (Gedung/Bangunan)
        lokasi: '',
        konstruksi: 'Permanen', // Dipetakan ke 'bahan' di DataIndukContent
        luas_lantai: '', // Hanya angka
        jumlah_lantai: 1,
        nomor_dokumen: '',
        asal_usul: 'Pembangunan',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Cek data minimal sebelum simpan
        if (!formData.nama_barang || !formData.nilai_perolehan || !formData.luas_lantai) {
             alert("Harap isi Nama Barang, Nilai Perolehan, dan Luas Lantai.");
             return;
        }

        // Kirim data ke parent (DataIndukContent)
        onSave(formData);
    };

    return (
        // DIHAPUS: bg-white, rounded-xl, shadow-lg, p-6
        // Form div ini dibiarkan polos agar menyatu dengan background abu-abu.
        <div> 
            <h2 className="text-2xl font-bold text-orange-700 mb-6 border-b pb-3">🏗️ Tambah Data KIB C (Gedung/Bangunan)</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Bagian Input Umum */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Barang (Nama Bangunan)</label>
                        <input type="text" name="nama_barang" value={formData.nama_barang} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kode Barang</label>
                        <input type="text" name="kode_barang" value={formData.kode_barang} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nilai Perolehan (Rp)</label>
                        <input type="number" name="nilai_perolehan" value={formData.nilai_perolehan} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                {/* Detail Bangunan */}
                <h3 className="text-lg font-semibold text-gray-800 pt-4 border-t mt-4">Detail Spesifik Bangunan</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Konstruksi</label>
                        <select name="konstruksi" value={formData.konstruksi} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="Permanen">Permanen (Beton)</option>
                            <option value="Semi Permanen">Semi Permanen</option>
                            <option value="Darurat">Darurat</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Luas Lantai (m²)</label>
                        <input type="number" name="luas_lantai" value={formData.luas_lantai} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jumlah Lantai</label>
                        <input type="number" name="jumlah_lantai" value={formData.jumlah_lantai} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Dokumen/IMB</label>
                        <input type="text" name="nomor_dokumen" value={formData.nomor_dokumen} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>
                
                {/* Bagian Lokasi & Tahun */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tahun Perolehan</label>
                        <input type="number" name="tahun_perolehan" value={formData.tahun_perolehan} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Lokasi/Alamat</label>
                        <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                {/* Bagian Keterangan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                    <textarea name="keterangan" rows="2" value={formData.keterangan} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>


                {/* Tombol Aksi */}
                <div className="pt-4 flex justify-end space-x-3">
                    <button type="button" onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <button type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                        Simpan Data KIB C
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormKIBC;