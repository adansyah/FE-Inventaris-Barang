
// --- ICONS (SVG Inline) ---
const Save = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);

// Styles (Konsisten dengan FormKIB)
const PRIMARY_COLOR = 'blue';
const PRIMARY_COLOR_CODE = '600';
const inputClasses = `block w-full px-0 py-2 text-sm bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-${PRIMARY_COLOR}-600 peer transition-colors duration-200 text-gray-900 placeholder-transparent`;
const labelClasses = `absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-${PRIMARY_COLOR}-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
const sectionHeaderClasses = "text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 mt-6 border-b border-gray-200 pb-1";

const FormEdit = () => {

    return (
        <div className="w-full h-full bg-gray-50 p-4 md:p-6 font-sans">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* 1. Header Compact */}
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center bg-white sticky top-0 z-20">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            Edit Data 
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">Mengubah data: <span className="font-semibold text-blue-600">nama</span></p>
                    </div>
                    <div className="flex space-x-3 w-full md:w-auto">
                        <button type="button"  className="flex-1 md:flex-none justify-center px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors">
                            Batal
                        </button>
                        <button  className={`flex-1 md:flex-none justify-center flex items-center px-6 py-2 rounded-lg text-sm font-bold text-white bg-${PRIMARY_COLOR}-${PRIMARY_COLOR_CODE} hover:bg-${PRIMARY_COLOR}-700 shadow-sm transition-all`}>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan Perubahan
                        </button>
                    </div>
                </div>

                <form  className="px-6 pb-8 pt-2">
                    
                    {/* SECTION I: Identitas Utama */}
                    <div className={sectionHeaderClasses}>I. Identitas & Lokasi</div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-5">
                        <div className="md:col-span-3 relative z-0 w-full group">
                            <input type="text" name="kode"  className={inputClasses} placeholder=" " required />
                            <label className={labelClasses}>Kode </label>
                        </div>
                        <div className="md:col-span-6 relative z-0 w-full group">
                            <input type="text" name="nama"  className={inputClasses} placeholder=" " required />
                            <label className={labelClasses}>Nama</label>
                        </div>
                        <div className="md:col-span-3 relative z-0 w-full group">
                            <input type="text" name="noreg"  className={inputClasses} placeholder=" " />
                            <label className={labelClasses}>No. Register</label>
                        </div>

                        {/* Baris 2 */}
                        <div className="md:col-span-4 relative z-0 w-full group">
                            <input type="text" name="merk"  className={inputClasses} placeholder=" " />
                            <label className={labelClasses}>Merk</label>
                        </div>
                        <div className="md:col-span-5 relative z-0 w-full group">
                            <input type="text" name="lokasi"  className={inputClasses} placeholder=" " />
                            <label className={labelClasses}>Lokasi</label>
                        </div>
                        <div className="md:col-span-3 relative z-0 w-full group">
                            <input type="number" name="tahun"  className={inputClasses} placeholder=" " />
                            <label className={labelClasses}>Tahun Perolehan</label>
                        </div>
                    </div>

                    {/* SECTION II: Detail Kendaraan (Hanya muncul jika KIB) */}
                   
                        <>
                            <div className={sectionHeaderClasses}>II. Detail Kendaraan (Opsional)</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <div className="relative z-0 w-full group">
                                    <input type="text" name="nopol"  className={inputClasses} placeholder=" " />
                                    <label className={labelClasses}>Nomor Polisi</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input type="text" name="norangka"  className={inputClasses} placeholder=" " />
                                    <label className={labelClasses}>Nomor Rangka</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input type="text" name="nobpkb"  className={inputClasses} placeholder=" " />
                                    <label className={labelClasses}>Nomor BPKB</label>
                                </div>
                            </div>
                        </>

                    {/* SECTION III: Nilai & Status */}
                    <div className={sectionHeaderClasses}>III. Kuantitas, Nilai & Kondisi</div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-5">
                        <div className="md:col-span-2 relative z-0 w-full group">
                            <input type="number" name="jumlah"  className={inputClasses} placeholder=" " required />
                            <label className={labelClasses}>Jumlah</label>
                        </div>
                        <div className="md:col-span-2 relative z-0 w-full group">
                            <input type="text" name="satuan"  className={inputClasses} placeholder=" " />
                            <label className={labelClasses}>Satuan</label>
                        </div>
                        
                        {/* Harga - Khusus KIB */}
                            <>
                                <div className="md:col-span-3 relative z-0 w-full group">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2 text-sm mt-1 font-medium">Rp</span>
                                        <input type="number" className={inputClasses} placeholder=" " />
                                    </div>
                                    <label className={labelClasses}>Harga Satuan (Edit)</label>
                                </div>
                                <div className="md:col-span-3 relative z-0 w-full group">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2 text-sm mt-1 font-bold">Rp</span>
                                        <input type="number" name="nilaiNumerik"  className={`${inputClasses} font-semibold`} placeholder=" " />
                                    </div>
                                    <label className={labelClasses}>Total Nilai Perolehan</label>
                                </div>
                            </>

                        <div className="md:col-span-2 relative z-0 w-full group">
                            <select name="kondisi"  className={inputClasses}>
                                <option>Baik</option>
                                <option>Kurang Baik</option>
                                <option>Rusak Berat</option>
                                <option>Tersedia</option>
                            </select>
                            <label className={labelClasses}>Kondisi / Status</label>
                        </div>

                        {/* Keterangan */}
                        <div className="md:col-span-12 relative z-0 w-full group mt-2">
                            <textarea name="keterangan" rows="2"  className={inputClasses} placeholder=" "></textarea>
                            <label className={labelClasses}>Keterangan Tambahan</label>
                        </div>
                    </div>

                    <div className="py-4"></div>
                </form>
            </div>
        </div>
    );
};

export default FormEdit;