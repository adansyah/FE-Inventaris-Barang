import React from 'react';
const DataIndukContent = () => { 
        return (
            <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-gray-100 mb-4">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                            Data Aset <span className="font-bold text-indigo-600">4</span>
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Kelola data aset inventaris negara (KIB/KIR).</p>
                    </div>
                    
                    <div className="flex flex-wrap space-x-3">
                         <button onClick={() => console.log('Export Excel')}>
                             <span className="mr-2 text-lg">⬇️</span> Export Excel Data
                         </button>
                         <button onClick={() => console.log('Export PDF')}>
                             <span className="mr-2 text-lg">📄</span> Export PDF Dokumen
                         </button>
                         <button
                             className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold transition duration-200 flex items-center shadow-md`}
                         >
                             <span className="text-xl mr-2 pb-1">+</span> 
                         </button>
                    </div>
                </div>

                <div className="flex space-x-6 w-full mb-4 border-b border-gray-200"> 
                    <button >🌱 KIB A (Tanah)</button>
                    <button >🔩 KIB B (Mesin)</button>
                    <button >🏗️ KIB C (Gedung)</button>
                </div>

                <div className="mb-6">
                     <input 
                         type="text" 
                         placeholder="Cari data dalam  (Nama, Kode, Kategori ABC)..."
                         className="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                     />
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg"> 
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase border-b border-gray-300 sticky top-0">
                        <tr>
                            <th colSpan="2" className="border-r border-gray-200 px-3 py-3">Penggolongan</th>
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 bg-indigo-50 text-indigo-700">Jenis KIB</th> 
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3">No. Register</th>
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-40">Nama Barang / Spesifikasi</th>
                            <th colSpan="2" className="border-r border-gray-200 px-3 py-3 bg-red-50 text-red-700">Heder</th> 
                            <th colSpan="2" className="border-r border-gray-200 px-3 py-3">Fisik</th>
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-16 bg-yellow-50 text-yellow-700">Kategori ABC</th> 
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-28">Nilai Perolehan</th>

                                <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-24 bg-indigo-50 text-indigo-700">
                                    QR Code
                                </th>

                            <th rowSpan="2" className="px-3 py-3 bg-gray-100">Aksi</th>
                        </tr>
                        <tr>
                            <th className="border-r border-gray-200 px-3 py-2">Kode Barang</th>
                            <th className="border-r border-gray-200 px-3 py-2">Tahun Perolehan</th>
                            
                                <th className="border-r border-gray-200 px-3 py-2 bg-red-100 text-red-800">
                                </th>

                            <th className="border-r border-gray-200 px-3 py-2">Jml</th>
                            <th className="border-r border-gray-200 px-3 py-2">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                            <tr  className="transition duration-100 bg-white hover:bg-indigo-50 border-b border-gray-100">
                                <td className="border-r border-gray-100 px-3 py-3 font-mono text-center"></td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center"></td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center"></td>
                                    <span className="text-xs font-semibold"></span>                                                                        
                               
                                <td className="border-r border-gray-100 px-3 py-3 text-center"></td>
                                <td className="border-r border-gray-100 px-3 py-3"></td>
                                
                                    <td  className="border-r border-gray-100 px-3 py-3 text-center text-red-600">
                                    </td>

                                <td className="border-r border-gray-100 px-3 py-3 text-center font-bold"></td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center"></td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center font-extrabold text-red-700 bg-yellow-100"></td>
                                <td className="border-r border-gray-100 px-3 py-3 text-right font-bold"></td>
                                <td className="border-r border-gray-100 px-3 py-3 text-right font-bold"></td>



                                <td className="px-3 py-3 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                                        <button className="text-red-600 hover:text-red-800 text-xs">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="16" className="text-center py-10 text-gray-500 italic bg-white">
                                    Tidak ada data 4 yang cocok.
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
            </>
        );
    };

    // ---------- TABEL KIB (dengan slot QR di KIB B) ----------
    


export default DataIndukContent;
