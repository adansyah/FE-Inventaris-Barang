import React, { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const PRIMARY_COLOR = 'indigo';

// Dummy kalau Dashboard belum kirim dataItems
const KIB_B_DATA_DUMMY = [
  {
    id: 101,
    nama: 'MOBIL DINAS SEDAN',
    merek: 'Toyota Camry',
    tahun: 2020,
    kode: '1.03.01.02.001',
    noreg: '0001',
    lokasi: 'Kantor Pusat',
    nilaiNumerik: 450000000,
    no_seri_pabrik: 'PBRK001',
  },
  {
    id: 102,
    nama: 'KOMPUTER PC STAF',
    merek: 'HP ProDesk',
    tahun: 2022,
    kode: '1.03.02.04.005',
    noreg: '0002',
    lokasi: 'Ruang Staf 1',
    nilaiNumerik: 12000000,
    no_seri_pabrik: 'PC-2022-005',
  },
  {
    id: 103,
    nama: 'MESIN FOTOCOPY DIGITAL',
    merek: 'Canon iR',
    tahun: 2021,
    kode: '1.03.01.02.010',
    noreg: '0003',
    lokasi: 'Ruang Arsip',
    nilaiNumerik: 85000000,
    no_seri_pabrik: 'MFP-C-010',
  },
  {
    id: 104,
    nama: 'KEYBOARD RUSAK',
    merek: 'Logitech',
    tahun: 2021,
    kode: '1.03.02.04.010',
    noreg: '0004',
    lokasi: 'Gudang',
    nilaiNumerik: 0,
    no_seri_pabrik: 'KB-2021-001',
  },
];

// ---------------- LABEL INDIVIDU ----------------
const LabelTemplate = ({ item, showQrCode, showPemdaLogo }) => {
  const registerNumber = item.noreg || '-';
  const barcodeNumber = item.no_seri_pabrik || 'N/A';

  const qrValue =
    item.qr_payload ||
    barcodeNumber ||
    `${item.kode || ''}|${registerNumber}`;

  return (
    <div className="label-item w-[280px] h-[95px] border border-gray-500 p-1 bg-white break-inside-avoid-page text-gray-900">
      {/* Header atas */}
      <div className="flex items-center justify-between border-b border-gray-400 pb-0.5 mb-0.5">
        <div className="flex items-center">
          {showPemdaLogo ? (
            <div className="w-4 h-4 mr-1 bg-gray-400 rounded-full flex-shrink-0" />
          ) : (
            <div className="w-4 h-4 mr-1 flex-shrink-0" />
          )}
          <span className="font-semibold text-[8px] leading-none">
            PEMERINTAH KOTA BANDUNG
          </span>
        </div>
        <span
          className={`font-extrabold text-[8px] text-${PRIMARY_COLOR}-600 leading-none`}
        >
          ASET DAERAH
        </span>
      </div>

      {/* Isi: QR + detail */}
      <div className="flex gap-1 items-start h-12">
        <div className="flex flex-col items-center justify-center w-20 h-full border border-gray-400 p-0.5 flex-shrink-0">
          <div className="w-full h-8 flex items-center justify-center mb-0.5">
            {showQrCode ? (
              <QRCodeSVG value={qrValue} size={30} level="M" includeMargin={false} />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>
          <p className="text-[7px] font-mono leading-none font-bold text-center">
            {barcodeNumber}
          </p>
        </div>

        <div className="flex-1 text-left pt-0.5">
          <p className="text-[9px] leading-tight">
            <span className="w-10 inline-block font-bold">Kode</span>:{' '}
            <span className="font-semibold">{item.kode || 'N/A'}</span>
          </p>
          <p className="text-[9px] leading-tight">
            <span className="w-10 inline-block font-bold">Reg</span>:{' '}
            <span className="font-semibold">{registerNumber}</span>
          </p>
          <p className="text-[9px] leading-tight">
            <span className="w-10 inline-block font-bold">Tahun</span>:{' '}
            <span className="font-semibold">{item.tahun || 'N/A'}</span>
          </p>
          <p className="text-[9px] leading-tight">
            <span className="w-10 inline-block font-bold">Lokasi</span>:{' '}
            <span className="font-semibold">{item.lokasi || 'N/A'}</span>
          </p>
        </div>
      </div>

      {/* Nama Aset */}
      <div className="mt-0.5 border-t border-gray-300 pt-0.5">
        <p className="text-[11px] font-extrabold uppercase leading-tight truncate">
          {item.nama || 'Nama Aset Tidak Tersedia'}
        </p>
      </div>
    </div>
  );
};

// ---------------- PREVIEW KECIL DI KANAN ----------------
const PreviewLabelBox = () => {
  const previewData = {
    kode: '02.06.01.04.01',
    nama: 'Laptop ASUS VivoBook 14"',
    nup: '0001',
    tahun: '2022',
    lokasi: 'KEC. BANDUNG KIDUL',
  };

  return (
    <div className="border border-yellow-500 bg-white p-1 shadow-md w-full max-w-[300px] mx-auto">
      <div className="flex items-center justify-between border-b border-gray-500 pb-0.5 mb-0.5">
        <div className="flex items-center">
          <div className="w-3 h-3 mr-1 bg-gray-400 flex-shrink-0" />
          <span className="font-semibold text-[6px] leading-none">
            PEMERINTAH KOTA BANDUNG
          </span>
        </div>
        <span className="font-extrabold text-[6px] text-gray-700 leading-none">
          KEC. BANDUNG KIDUL
        </span>
      </div>

      <div className="flex gap-1 items-start h-10">
        <div className="flex flex-col items-center justify-center w-16 h-full border border-gray-400 p-0.5 flex-shrink-0">
          <div className="w-full h-7 bg-gray-300 mb-0.5" />
          <p className="text-[5px] font-mono leading-none font-bold">
            {previewData.nup}
          </p>
        </div>

        <div className="flex-1 text-left pt-0.5">
          <p className="text-[7px] leading-tight">
            <span className="w-8 inline-block font-bold">Kode</span>:{' '}
            <span className="font-semibold">{previewData.kode}</span>
          </p>
          <p className="text-[7px] leading-tight">
            <span className="w-8 inline-block font-bold">Nama</span>:{' '}
            <span className="font-semibold">{previewData.nama}</span>
          </p>
          <p className="text-[7px] leading-tight">
            <span className="w-8 inline-block font-bold">NUP</span>:{' '}
            <span className="font-semibold">{previewData.nup}</span>
          </p>
          <p className="text-[7px] leading-tight">
            <span className="w-8 inline-block font-bold">Tahun</span>:{' '}
            <span className="font-semibold">{previewData.tahun}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ---------------- PANEL KONFIGURASI ----------------
const PrintConfiguration = ({
  selectedCount,
  onPrint,
  showQrCode,
  onToggleShowQr,
  showPemdaLogo,
  onToggleShowPemda,
}) => {
  const [paperSize, setPaperSize] = useState('Kertas Sticker A4 (Grid)');

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        ⚙️ Konfigurasi Cetak (Satuan)
      </h2>

      <div className="mb-4">
        <p className="font-semibold text-sm mb-2">Preview Label (Satuan)</p>
        <PreviewLabelBox />
      </div>

      <hr className="my-4" />

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ukuran Kertas
        </label>
        <select
          value={paperSize}
          onChange={(e) => setPaperSize(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option>Kertas Sticker A4 (Grid)</option>
          <option>Kertas Sticker Tom & Jerry 121</option>
          <option>Kertas A4 Utuh</option>
        </select>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Tampilkan QR Code</span>
        <input
          type="checkbox"
          checked={showQrCode}
          onChange={(e) => onToggleShowQr(e.target.checked)}
          className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          Tampilkan Logo Pemda
        </span>
        <input
          type="checkbox"
          checked={showPemdaLogo}
          onChange={(e) => onToggleShowPemda(e.target.checked)}
          className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
        />
      </div>

      <button
        onClick={onPrint}
        className={`w-full bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition duration-200`}
        disabled={selectedCount === 0}
      >
        Cetak ({selectedCount}) Label
      </button>

      <div className="mt-4 p-3 bg-blue-100 text-blue-800 text-xs rounded-md">
        <p className="font-bold">Tips:</p>
        <p>
          Gunakan kertas label <b>Tom & Jerry No. 121</b> atau{' '}
          <b>Sticker HVS A4 Utuh</b> untuk hasil terbaik.
        </p>
      </div>
    </div>
  );
};

// ---------------- KOMPONEN UTAMA ----------------
const PrintLabelsContent = ({ dataItems = KIB_B_DATA_DUMMY }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [assetType, setAssetType] = useState('KIB B');
  const [roomLocation, setRoomLocation] = useState('Semua Ruangan');

  const [showQrCode, setShowQrCode] = useState(true);
  const [showPemdaLogo, setShowPemdaLogo] = useState(true);

  const printableItems = useMemo(
    () =>
      (dataItems || []).filter(
        (item) =>
          (item.nilaiNumerik || 0) > 0 &&
          (roomLocation === 'Semua Ruangan' || item.lokasi === roomLocation) &&
          (assetType === 'KIB B' ? true : false)
      ),
    [dataItems, assetType, roomLocation]
  );

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === printableItems.length && printableItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(printableItems.map((item) => item.id));
    }
  };

  const selectedItems = printableItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  const handlePrint = () => {
    window.print();
  };

  const locations = [
    'Semua Ruangan',
    'Kantor Pusat',
    'Ruang Staf 1',
    'Ruang Arsip',
    'Gudang',
  ];

  const displayedItems = printableItems;

  // Data yang benar-benar di-print:
  // - Kalau ada yang dicentang → pakai yang dipilih
  // - Kalau nggak ada yang dicentang → print semua printableItems
  const itemsForPrint =
    selectedItems.length > 0 ? selectedItems : printableItems;

  return (
    <div className="w-full text-gray-800">
      {/* ====================== MODE LAYAR (TIDAK DI PRINT) ====================== */}
      <div className="print:hidden">
        <h1 className="text-2xl font-bold mb-4">
          🖨️ Cetak Label & Barcode Aset
        </h1>

        <div className="flex gap-6">
          {/* Kolom kiri: daftar aset */}
          <div className="flex-1 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Daftar Aset KIB B Siap Cetak
            </h2>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Cari Aset
                </label>
                <input
                  type="text"
                  placeholder="Nama Barang, Kode, atau NUP..."
                  className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Lokasi Ruangan
                </label>
                <select
                  value={roomLocation}
                  onChange={(e) => setRoomLocation(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setAssetType('KIB B')}
                className={`px-4 py-1 text-sm rounded-full transition-colors ${
                  assetType === 'KIB B'
                    ? `bg-${PRIMARY_COLOR}-600 text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                KIB B
              </button>
              <button
                onClick={() => setAssetType('KIB E')}
                className={`px-4 py-1 text-sm rounded-full transition-colors ${
                  assetType === 'KIB E'
                    ? `bg-${PRIMARY_COLOR}-600 text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled
              >
                KIB E
              </button>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Total Aset KIB Siap Cetak:{' '}
                <span className="font-bold text-lg">{printableItems.length}</span>
              </p>
            </div>

            <div className="overflow-y-auto max-h-[400px] border border-gray-200 rounded-md">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="p-3">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length === printableItems.length &&
                          printableItems.length > 0
                        }
                        onChange={handleSelectAll}
                        className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Aset
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kode / NUP
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokasi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleToggleSelect(item.id)}
                          className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                        {item.nama}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                        {item.kode} / {item.noreg}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                        {item.lokasi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kolom kanan: konfigurasi cetak */}
          <div className="w-96 flex-shrink-0">
            <PrintConfiguration
              selectedCount={selectedIds.length}
              onPrint={handlePrint}
              showQrCode={showQrCode}
              onToggleShowQr={setShowQrCode}
              showPemdaLogo={showPemdaLogo}
              onToggleShowPemda={setShowPemdaLogo}
            />
          </div>
        </div>

        {/* Preview label di layar */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">
            Pratinjau Label yang Akan Dicetak
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {itemsForPrint.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Tidak ada aset yang siap cetak.
              </p>
            ) : (
              itemsForPrint.map((item) => (
                <LabelTemplate
                  key={item.id}
                  item={item}
                  showQrCode={showQrCode}
                  showPemdaLogo={showPemdaLogo}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ====================== MODE CETAK (HANYA LABEL) ====================== */}
      <div className="hidden print:block p-4">
        <div className="grid grid-cols-3 gap-4">
          {itemsForPrint.map((item) => (
            <LabelTemplate
              key={item.id}
              item={item}
              showQrCode={showQrCode}
              showPemdaLogo={showPemdaLogo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintLabelsContent;
