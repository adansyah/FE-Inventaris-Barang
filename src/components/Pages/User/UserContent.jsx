import React, { useEffect, useState, useCallback } from 'react'; // Tambahkan useCallback
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
// Tambahkan debounce untuk optimasi search
import { debounce } from 'lodash'; 

function UserContent() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    // State baru untuk keyword pencarian
    const [searchKeyword, setSearchKeyword] = useState(''); 

    // Gunakan useCallback untuk memastikan fetchData tidak berubah di setiap render
    // jika searchKeyword tidak berubah, ini penting untuk debounce
    const fetchData = useCallback(async (keyword = '') => {
        setLoading(true); // Mulai loading saat fetching data
        try {
            const token = localStorage.getItem("token");
            
            // Kirim keyword pencarian sebagai parameter query 'search'
            const res = await axios.get(`http://localhost:8000/api/user?search=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(res.data.data);
        } catch (err) {
            console.error("Gagal fetch data:", err);
            toast.error("Gagal memuat data pengguna.");
        } finally {
            setLoading(false); // Hentikan loading
        }
    }, []); // Dependency array kosong, fetchData tidak bergantung pada props/state lain

    // Gunakan useEffect untuk memanggil fetchData saat komponen pertama kali dimuat
    // dan setiap kali searchKeyword berubah (dengan debounce)
    useEffect(() => {
        // Debounce: menunda eksekusi fetchData selama 500ms setelah user berhenti mengetik
        const delayedFetch = debounce((keyword) => {
            fetchData(keyword);
        }, 500);

        delayedFetch(searchKeyword);

        // Cleanup function untuk membatalkan debounce saat komponen unmount atau keyword berubah
        return () => delayedFetch.cancel();
    }, [searchKeyword, fetchData]); // Dependency array menyertakan searchKeyword dan fetchData

    // Handler untuk input pencarian
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleDelete = async (id, name) => {
        const result = await Swal.fire({
            title: `Hapus Pengguna ${name}?`,
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        });
        
        if (!result.isConfirmed) return;

        try {
            const token = localStorage.getItem("token");

            // PERBAIKAN: Endpoint delete harus mengarah ke /api/user/{id}, BUKAN /api/kib/{id}
            await axios.delete(`http://localhost:8000/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Update state lokal
            setUsers((prev) => prev.filter((item) => item.id !== id));
            
            // PERBAIKAN: Perbaiki format toast.success
            toast.success(`Data User ${name} berhasil dihapus.`);
            
        } catch (error) {
            console.error(error);
            // PERBAIKAN: Perbaiki toast.err menjadi toast.error
            toast.error("Gagal menghapus data."); 
        }
    }

    // Fungsi untuk memformat tanggal
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-gray-100 mb-4">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                        Data Pengguna <span className="font-bold text-indigo-600">s</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">Kelola data Pengguna inventaris negara (KIB/KIR).</p>
                </div>
                
                <div className="flex flex-wrap space-x-3 text-sm text-gray-600">
                    <button onClick={() => toast.info('Fitur Export Excel belum diimplementasi')} className="hover:text-indigo-600 transition">
                       <span className="mr-2 text-lg">⬇️</span> Export Excel Data
                    </button>
                    <button onClick={() => toast.info('Fitur Export PDF belum diimplementasi')} className="hover:text-indigo-600 transition">
                       <span className="mr-2 text-lg">📄</span> Export PDF Dokumen
                    </button>
                </div>
            </div>
            
            {/* Input Search dan Tombol Tambah */}
            <div className="flex mb-5 items-center">
                <input 
                    type="text"
                    placeholder={`Cari data dalam (Nama, Email, Jabatan)...`}
                    value={searchKeyword}
                    onChange={handleSearchChange} // Gunakan handler baru
                    className="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />
                <div className='ml-auto'>
                    <Link
                        to="/user/tambah"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        Tambah Data
                    </Link>
                </div>
            </div>

            {/* Tabel Data */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg"> 
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase border-b border-gray-300 sticky top-0">
                        <tr>
                            <th className="border-r border-gray-200 px-3 py-3">No</th>
                            <th className="border-r border-gray-200 px-3 py-3 bg-indigo-50 text-indigo-700">Nama</th> 
                            <th className="border-r border-gray-200 px-3 py-3">Email</th>
                            <th className="border-r border-gray-200 px-3 py-3 w-40">Jabatan</th>
                            <th className="border-r border-gray-200 px-3 py-3">Created At</th>
                            <th className="px-3 py-3 bg-gray-100">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-center">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 bg-white">
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                                        <p className="ml-3 text-sm text-gray-500">Memuat data...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-10 text-gray-500 italic bg-white">
                                    {searchKeyword ? `Tidak ditemukan data pengguna untuk keyword "${searchKeyword}".` : "Tidak ada data pengguna."}
                                </td>
                            </tr>
                        ) : (
                            users.map((user, i) => (
                                <tr key={user.id} className="transition duration-100 hover:bg-indigo-50 border-b border-gray-100">
                                    <td className="border-r border-gray-100 px-3 py-3 font-mono text-center">{ i + 1 }</td>
                                    <td className="border-r border-gray-100 px-3 py-3 text-left">{ user.name }</td>
                                    <td className="border-r border-gray-100 px-3 py-3 text-left">{ user.email}</td>
                                    <td className="border-r border-gray-100 px-3 py-3 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                                            ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="border-r border-gray-100 px-3 py-3"> {formatDate(user.created_at)}</td>

                                    <td className="px-3 py-3 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link to={`/user/edit/${user.id}`} className="cursor-pointer text-amber-600 hover:text-amber-800 text-xs" title="Edit">
                                                {/* Icon Edit */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 18.07a4.5 4.5 0 0 1-1.897 1.13L6 20l1.995-5.385a4.5 4.5 0 0 1 1.13-1.897l8.243-8.243Z" />
                                                </svg>
                                            </Link>
                                            <button onClick={() => handleDelete(user.id, user.name)} className="cursor-pointer text-red-600 hover:text-red-800 text-xs" title="Hapus">
                                                {/* Icon Hapus */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserContent;