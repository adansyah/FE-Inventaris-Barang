import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UserContent() {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const res = await axios.get("http://localhost:8000/api/user", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
      setUsers(res.data.data);
    } catch (err){
      console.log(err);
      console.log(localStorage.getItem("token"))
    } finally {
      setLoading(false);
    }}

  return (
    <>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-gray-100 mb-4">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                            Data Pengguna <span className="font-bold text-indigo-600">s</span>
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Kelola data Pengguna inventaris negara (KIB/KIR).</p>
                    </div>
                    
                    <div className="flex flex-wrap space-x-3">
                         <button onClick={() => console.log('Export Excel')} >
                             <span className="mr-2 text-lg">⬇️</span> Export Excel Data
                         </button>
                         <button onClick={() => console.log('Export PDF')} >
                             <span className="mr-2 text-lg">📄</span> Export PDF Dokumen
                         </button>
                         <button
                             className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold transition duration-200 flex items-center shadow-md`}
                         >
                             <span className="text-xl mr-2 pb-1">+</span> 
                             
                         </button>
                    </div>
                </div>
              

                <div className="mb-6">
                     <input 
                         type="text"
                         placeholder={`Cari data dalam (Nama, Kode, Kategori ABC)...`}
                         className="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                     />
                </div>

                 <div className="overflow-x-auto border border-gray-200 rounded-lg"> 
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase border-b border-gray-300 sticky top-0">
                        <tr>
                            <th className="border-r border-gray-200 px-3 py-3">No</th>
                            <th className="border-r border-gray-200 px-3 py-3 bg-indigo-50 text-indigo-700">Nama</th> 
                            <th className="border-r border-gray-200 px-3 py-3">Email</th>
                            <th className="border-r border-gray-200 px-3 py-3 w-40">Jabatan</th>
                            {/* <th colSpan={config.specialHeaders.length} className="border-r border-gray-200 px-3 py-3 bg-red-50 text-red-700">{config.specialHeader}</th>  */}
                            <th className="border-r border-gray-200 px-3 py-3">Created_at</th>
                            <th className="px-3 py-3 bg-gray-100">Aksi</th>
                        </tr>
                       
                    </thead>
                    <tbody className="text-xs text-center">
                          {Loading ? (
                            <tr>
                <td colSpan="6" className="py-8 text-gray-500 italic">
                  Memuat data...
                </td>
              </tr>
                          ) : users.length === 0 ? (
                            <tr>
                <td colSpan="6" className="py-10 text-gray-500 italic bg-white">
                  Tidak ada data yang cocok.
                </td>
              </tr>
                          ) : (
                            users.map((user, i) => (
                                <tr key={user.id} className="transition duration-100 hover:bg-indigo-50 border-b border-gray-100">
                                <td className="border-r border-gray-100 px-3 py-3 font-mono text-center">{ i + 1 }</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{ user.name }</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{ user.email}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{user.role}</td>
                                <td className="border-r border-gray-100 px-3 py-3"> {user.created_at}</td>

                                <td className="px-3 py-3 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="cursor-pointer text-amber-600 hover:text-amber-800 text-xs">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
</button>

<button className="cursor-pointer text-red-600 hover:text-red-800 text-xs">
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
  )
}

export default UserContent
