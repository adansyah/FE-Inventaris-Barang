import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Asumsi FormInput dan FormSelect adalah komponen yang valid dan diimpor
// Saya akan mendefinisikannya di bagian bawah jika Anda belum mengimpornya.

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate(); // Tambahkan hook useNavigate

  const [form, setForm] = useState({
    name: "",
    email: "",
    // Penting: Kosongkan password. API akan mengabaikannya jika kosong.
    password: "", 
    role: "kelurahan",
  });

  const [loading, setLoading] = useState(true);

  // Data awal yang diambil dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:8000/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set form hanya untuk data yang ingin ditampilkan dan diedit
        setForm({
          name: res.data.data.name || "",
          email: res.data.data.email || "",
          password: "", // Jangan pernah mengisi field password dengan data dari API
          role: res.data.data.role || "kelurahan",
        });

        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
        toast.error("Gagal memuat data pengguna.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Persiapan data untuk dikirim
    const dataToSubmit = { ...form };
    
    // Hapus password dari data yang akan dikirim jika kosong
    if (dataToSubmit.password === "") {
        delete dataToSubmit.password;
    }

    try {
      // Laravel memerlukan method PUT/PATCH, tapi Axios POST dengan _method: 'PUT'
      const data = new FormData();
      Object.entries(dataToSubmit).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("_method", "PUT"); 

      const response = await axios.post(
        `http://localhost:8000/api/user/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'multipart/form-data' diperlukan jika kita ingin menggunakan FormData
            // Walaupun tidak ada file, ini tetap bekerja baik dengan _method PUT
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      toast.success(`Berhasil mengupdate pengguna ${response.data.data.name}`);
      // Redirect ke halaman daftar user setelah sukses
      navigate("/user"); 

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Gagal mengupdate data. Cek validasi.";
      toast.error(errorMessage);
    }
  };

  // Tampilan Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Tampilan Form Update User
  return (
    <div>
      <div className="flex min-h-screen font-sans bg-gray-100">
        <div className="print:hidden">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="print:hidden">
            <Header />
          </div>

          <main className="p-8 flex-1">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
              ✏️ Edit Data Pengguna
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* FORM GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormInput
                  label="Nama Lengkap"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <FormInput
                  label="Password (Kosongkan jika tidak ingin diubah)"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <FormSelect
                  label="Jabatan"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "kelurahan", label: "Kelurahan" },
                  ]}
                />
              
              </div>

              <div className="flex justify-end space-x-3">
                <Link to="/user" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200">
                  Kembali
                </Link>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Update Data
                </button>
              </div>

            </form>
          </main>

          <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200 print:hidden">
            © 2025 SIMBADA Kecamatan Bandung Kidul. V1.4.0
          </footer>
        </div>
      </div>
    </div>
  )
}

// --------------------------------------------------------
// Komponen Pembantu (FormInput & FormSelect)
// Jika Anda mengimpornya dari file terpisah, Anda bisa menghapus definisi ini.
// --------------------------------------------------------

function FormInput({ label, name, value, onChange, type = "text" }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          // Pastikan value adalah string, jika null/undefined tampilkan string kosong
          value={value ?? ''} 
          onChange={onChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    );
  }
  
  function FormSelect({ label, name, value, onChange, options }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          {options.map((o, idx) => (
            <option key={idx} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

export default UpdateUser