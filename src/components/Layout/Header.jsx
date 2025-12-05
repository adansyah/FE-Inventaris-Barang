// Header.jsx (Tidak ada perubahan, kode Anda sudah siap)

import React from 'react';



const Header = ({ activeMenuLabel, onToggleSidebar }) => (
    <div className="bg-white px-4 sm:px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20 border-b border-gray-100 print:hidden">
        
        {/* Burger Menu Button (Mobile Only, lg:hidden) */}
        <button
            onClick={onToggleSidebar} // <-- Tombol ini akan memanggil fungsi toggle
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg mr-4"
            aria-label="Toggle Sidebar"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        {/* Breadcrumb / Label Aktif */}
        <div className="text-sm flex items-center flex-1 min-w-0">
            <span className="text-gray-500 font-medium hidden sm:inline">PKB / Kec. Bandung Kidul /</span>
            <span className={`font-bold text-indigo-700 ml-2 text-base truncate`}>{activeMenuLabel}</span>
        </div>
        
        {/* User Info */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-4">
            <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm">{localStorage.getItem("name") || "Admin Default"}</p>
                <p className="text-xs text-gray-500">{localStorage.getItem("role") || "Administrator"}</p>
            </div>
            {/* User Avatar */}
            <div className={` flex items-center justify-center  cursor-pointer transition duration-300`}>
                {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg> */}
                            <img
                src="/logo.png" // Placeholder: Logo Putih
                alt="Logo Bandung Kidul"
                className="w-10 h-10 rounded-full object-cover m-auto"
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/40x40/ffffff/1a1a4f?text=BK"; // Fallback ke Teks jika gambar gagal
                }}
                />
            </div>
        </div>
    </div>
);

export default Header;