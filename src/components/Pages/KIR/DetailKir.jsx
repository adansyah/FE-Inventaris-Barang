import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const KirDetail = () => {
  const { id } = useParams();
  const [kir, setKir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKir();
  }, []);

  const fetchKir = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/kir/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setKir(response.data.data);
      console.log(localStorage.getItem('token'));
    } catch (error) {
      console.error('Gagal mengambil data KIR:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) 
    return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  )
  
  if (!kir) return <p className="p-8 text-center text-red-500">Data tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-6 md:p-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Detail KIR
        </h1>
        
        {/* Gambar Barang */}
        <div className="flex justify-center mb-6">
          {kir.kib.gambar_url ? (
            <img
              src={kir.kib.gambar_url}
              alt="Gambar Barang"
              className="w-full max-w-sm rounded-lg shadow border"
            />
          ) : (
            <div className="w-full max-w-sm h-40 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500">
              Tidak ada gambar barang
            </div>
          )}
        </div>

        {/* Data Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Nama Barang:</strong> {kir.nama_barang}</p>
          <p><strong>Merek/Tipe:</strong> {kir.merk}</p>
          <p><strong>Kode Barang:</strong> {kir.kode_barang}</p>
          <p><strong>Tahun Perolehan:</strong> {kir.tahun}</p>
          <p><strong>Lokasi:</strong> {kir.lokasi}</p>
          <p><strong>Kondisi:</strong> {kir.kondisi}</p>
          <p><strong>Jumlah:</strong> {kir.jumlah}</p>
          <p><strong>Nilai Perolehan:</strong> {kir.nilai_perolehan}</p>
        </div>

        {/* QR Code */}
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold mb-2">QR Code</h2>

          {kir.gambar_qr ? (
            <img
              src={kir.gambar_qr}
              alt="QR Code"
              className="w-32 h-32 mx-auto  shadow"
            />
          ) : (
            <div className="w-32 h-32 mx-auto border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500">
              QR
            </div>
          )}
        </div>

        {/* Keterangan */}
        <div className="mt-6">
          <strong className="block mb-1">Keterangan:</strong>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg ">
            {kir.keterangan || '-'}
          </p>
        </div>

        {/* Tombol Kembali */}
        {/* <div className="mt-8 text-center">
          <Link
            to="/laporan-kir"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Kembali ke Laporan
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default KirDetail;
