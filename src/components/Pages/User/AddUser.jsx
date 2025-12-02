import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import Header from '../../Layout/Header';
// Catatan: Saya mengasumsikan FormSelect, FormInput, FormTextArea diimpor dari lokasi yang benar
// import FormSelect from '../../Form/FormSelect'; 
// import FormInput from '../../Form/FormInput';
// import FormTextArea from '../../Form/FormTextArea';
import { toast } from 'react-toastify';


function AddUser() {
    // 1. Definisikan State dan Hook
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "kelurahan", // Default ke kelurahan
    });

    // 2. Handler Perubahan Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // 3. Handler Pengiriman Formulir
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi Sederhana
        if (!form.name || !form.email || !form.password || !form.role) {
            toast.error("Semua field harus diisi!");
            return;
        }
        
        // Cek panjang password (opsional, tapi baik)
        if (form.password.length < 6) {
            toast.error("Password minimal 6 karakter.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8000/api/user", 
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Pengguna baru " + response.data.data.name + " berhasil ditambahkan!");
            
            // Redirect ke halaman daftar pengguna
            navigate("/user"); 

        } catch (err) {
            console.error("Gagal menambah pengguna:", err.response?.data || err);
            const errorMessage = err.response?.data?.message || "Gagal menambah pengguna. Coba lagi.";
            toast.error(errorMessage);
        }
    };


    return (
      <div>
        <div className="flex min-h-screen font-sans bg-gray-100">

        {/* Sidebar */}
        <div className="print:hidden">
            <Sidebar />
        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

            <div className="print:hidden">
            <Header />
            </div>

            <main className="p-8 flex-1">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
                ➕ Tambah Pengguna Baru
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* GRID FORM */}
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
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <FormInput
                    label="Jabatan"
                    name="role"
                    value={form.role}
                    readOnly
                    onChange={handleChange}
                />

                {/* <FormSelect
                    label="Jabatan"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    options={[
                        { value: "admin", label: "Admin" },
                        { value: "kelurahan", label: "Kelurahan" },
                    ]}
                /> */}

                
                </div>

                {/* BUTTON */}
                <div className="flex justify-end space-x-3">
                <Link
                    to="/user"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200"
                >
                    Kembali
                </Link>

                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Simpan Data
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

// Catatan: Saya memindahkan FormInput dan FormSelect ke dalam file yang diimpor
// atau biarkan di sini jika Anda tidak bisa mengimpornya.
// Jika Anda mengimpornya, hapus definisi di bawah ini.

function FormInput({ label, name, value, onChange, type = "text", step, readOnly }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          step={step}
          name={name}
          value={value ?? ''} // Tambahkan ?? '' untuk memastikan input terkontrol
          readOnly={readOnly}
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

export default AddUser