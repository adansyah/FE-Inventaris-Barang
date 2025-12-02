import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// Ikon lucide-react telah dihapus dan diganti dengan inline SVG di bawah

// Komponen ikon pengganti (Inline SVG)
const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const LogInIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" x2="3" y1="12" y2="12"/>
  </svg>
);

// Ikon Mata (Terlihat)
const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// Ikon Mata (Tersembunyi)
const EyeOffIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.5 7 8.5 7a11.72 11.72 0 0 1-.41 1.21M4.5 12.79A11.72 11.72 0 0 0 4 12c.5-1.5 3.5-7 10-7a10.43 10.43 0 0 1 2.32.74"/>
      <line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
);


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Variabel konfigurasi Tailwind yang sekarang tidak digunakan lagi telah dihapus.
  // Kelas dimasukkan langsung ke JSX.

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Simpan data di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      // Redirect ke dashboard untuk semua role
      toast.success("Selamat Datang" + ' ' + user.name);
      navigate("/dashboard");
    } catch (err) {
      // Menampilkan pesan error yang ramah pengguna
      toast.error("Email atau password salah! Silakan coba lagi.");
      console.error("Login Gagal:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a4f]  flex items-center justify-center p-4 sm:p-8">
      
      {/* Container Utama (Card Tunggal) */}
      <div 
        className="bg-white p-8 sm:p-10 shadow-2xl rounded-xl w-full max-w-lg  transition-all duration-300 transform hover:scale-[1.01]"
      >
        
        {/* Header/Branding Area */}
        
            <div className="flex items-center space-x-3 justify-center">
                {/* Gunakan tag <img> untuk logo. Ganti URL placeholder dengan logo Anda. */}
                <img
                    src="logo.png" // Placeholder: Logo Putih
                    alt="Logo Bandung Kidul"
                    className="w-50 h-50 rounded-full object-cover"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/40x40/ffffff/1a1a4f?text=BK"; // Fallback ke Teks jika gambar gagal
                    }}
                />
            </div>
            <p className="text-1xl text-center font-bold mt-2 mb-3">SISTEM INFORMASI MANAJEMEN BARANG DAERAH</p>

        {/* Form Area */}
        {/* <h2 className="text-2xl font-bold text-gray-500 mb-2">
          Selamat Datang Kembali
        </h2> */}
        <p className="text-sm text-center text-gray-500 mb-3">
          Masukkan detail akun Anda untuk mengakses sistem.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="email"
                placeholder="admin@contoh.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}
           <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
              PASSWORD SISTEM
            </label>
            <div className="relative">
              {/* Ikon Kunci */}
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                // Tipe input dinamis
                type={showPassword ? "text" : "password"} 
                id="password"
                placeholder="********"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                // Penambahan padding kanan (pr-10) untuk memberi ruang bagi ikon mata
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
              
              {/* Tombol Toggle Mata */}
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" /> // Tampilkan ikon mata dicoret jika password terlihat
                ) : (
                  <EyeIcon className="h-4 w-4" /> // Tampilkan ikon mata jika password tersembunyi
                )}
              </button>
            </div>
          </div>

          

          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            <LogInIcon className="w-5 h-5" />
            <span>MASUK</span>
          </button>
        </form>
        
        {/* Footer Info */}
        <p className="text-center text-xs opacity-50 text-gray-500 mt-8">
            © 2025 Kecamatan Bandung Kidul
        </p>
      </div>
      {/* End of Card Container */}

    </div>
  );
};

export default LoginForm;