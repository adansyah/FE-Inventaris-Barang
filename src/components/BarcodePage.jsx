// src/components/BarcodePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const BarcodePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rawPayload = searchParams.get('payload');

  let data = null;
  let error = '';

  if (!rawPayload) {
    error = 'Payload QR tidak ditemukan di URL.';
  } else {
    // URLSearchParams.get() biasanya sudah mengembalikan string yang ter-decode.
    // Kita coba parse langsung dulu.
    try {
      data = JSON.parse(rawPayload);
    } catch (e1) {
      // Kalau gagal, baru coba decodeURIComponent lalu parse lagi.
      try {
        const decoded = decodeURIComponent(rawPayload);
        data = JSON.parse(decoded);
      } catch (e2) {
        error = 'Data di dalam QR tidak valid atau rusak.';
      }
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600 mb-2">QR Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-xs text-gray-400">
            Pastikan QR yang discan berasal dari sistem SIMBADA dan belum dimodifikasi.
          </p>
        </div>
      </div>
    );
  }

  const {
    nama_barang,
    kode_barang,
    lokasi_ruangan,
    tahun_perolehan,
    merek_model,
    no_seri_pabrik,
    kondisi,
    jumlah_barang,
    keterangan,
    foto_base64,
  } = data || {};

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center px-4 py-8">
      <div className="bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              SIMBADA • Kartu Inventaris Ruangan
            </p>
            <h1 className="text-lg font-semibold text-slate-50 mt-1">
              Detail Aset KIR
            </h1>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
            QR Verified
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Gambar */}
          {foto_base64 ? (
            <div className="w-full flex justify-center">
              <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-md max-h-60">
                <img
                  src={foto_base64}
                  alt={nama_barang || 'Foto aset'}
                  className="object-cover max-h-60"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-40 h-32 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-[11px] text-slate-500">
                Tidak ada foto terlampir
              </div>
            </div>
          )}

          {/* Info Utama */}
          <div className="bg-slate-900/40 rounded-xl border border-slate-700 px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Nama Barang</p>
            <p className="text-base font-semibold text-slate-50">
              {nama_barang || '-'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {merek_model ? `Merek / Tipe: ${merek_model}` : null}
            </p>
          </div>

          {/* Grid Detail */}
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-2.5">
              <p className="text-slate-500 mb-0.5">Kode Barang</p>
              <p className="font-mono text-xs text-slate-100 break-all">
                {kode_barang || '-'}
              </p>
            </div>
            <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-2.5">
              <p className="text-slate-500 mb-0.5">No. Seri Pabrik</p>
              <p className="font-mono text-[11px] text-slate-100 break-all">
                {no_seri_pabrik || '-'}
              </p>
            </div>
            <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-2.5">
              <p className="text-slate-500 mb-0.5">Tahun Perolehan</p>
              <p className="text-slate-100 text-xs">
                {tahun_perolehan || '-'}
              </p>
            </div>
            <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-2.5">
              <p className="text-slate-500 mb-0.5">Kondisi</p>
              <p className="text-slate-100 text-xs font-semibold">
                {kondisi || '-'}
              </p>
            </div>
            <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-2.5">
              <p className="text-slate-500 mb-0.5">Lokasi / Ruangan</p>
              <p className="text-slate-100 text-xs">
                {lokasi_ruangan || '-'}
              </p>
            </div>
            <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-2.5">
              <p className="text-slate-500 mb-0.5">Jumlah Unit</p>
              <p className="text-slate-100 text-xs font-semibold">
                {jumlah_barang || '-'}
              </p>
            </div>
          </div>

          {/* Keterangan */}
          <div className="bg-slate-900/30 rounded-lg border border-slate-700 px-3 py-3 text-[11px]">
            <p className="text-slate-500 mb-1">Keterangan</p>
            <p className="text-slate-100 leading-relaxed">
              {keterangan && keterangan.trim() !== ''
                ? keterangan
                : 'Tidak ada keterangan tambahan pada data KIR ini.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
          <span>© 2025 SIMBADA Kecamatan Bandung Kidul</span>
          <span>Generated via QR KIR</span>
        </div>
      </div>
    </div>
  );
};

export default BarcodePage;
