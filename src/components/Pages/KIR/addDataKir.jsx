import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";

export default function AddData() {
  const navigate = useNavigate();

  const [kibs, setKibs] = useState([]);

  // STATE FORM
  const [form, setForm] = useState({
    kib_id: "",
    nama_barang: "",
    kode_barang: "",
    tahun: "",
    lokasi_ruangan: "",
    kondisi: "baik",
    jumlah: "",
    nilai_perolehan: "",
  });

  // AMBIL DATA KIB DARI BACKEND
useEffect(() => {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:8000/api/kib", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("RESPON KIB:", res.data.data);
      setKibs(res.data.data); // sementara
    })
    .catch((err) => console.log(err));
}, []);

  // HANDLE CHANGE FORM
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // Jika kib dipilih → set kode_barang otomatis
    if (name === "kib_id") {
      const selected = kibs.find((k) => k.id == value);

      if (selected) {
        setForm((prev) => ({
          ...prev,
          kode_barang: selected.kode_barang || selected.kode_kib, // sesuai API mu
          nama_barang: selected.nama_barang,
        }));
      }
    }
  };

  // SUBMIT DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/api/kir", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Data berhasil ditambahkan!");
      navigate("/laporan-kir");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan data");
    }
  };

  return (
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
          <h2 className="text-2xl font-bold text-green-700 mb-6 border-b pb-3">
            🌱 Tambah Data KIR
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* GRID FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <FormInput
                label="Nama Barang"
                name="nama_barang"
                value={form.nama_barang}
                onChange={handleChange}
              />

              {/* Jenis KIB – dari API */}
              <FormSelect
                label="Jenis KIB (kib_id)"
                name="kib_id"
                value={form.kib_id}
                onChange={handleChange}
                options={[
                  { value: "", label: "-- Pilih KIB --" },
                  ...kibs.map((k) => ({
                    value: k.id,
                    label: `${k.type_kib} - ${k.nama_barang} - ${k.kode_barang || k.kode_kib} `, 
                  })),
                ]}
              />

              <FormInput
                label="Kode Barang (Auto)"
                name="kode_barang"
                value={form.kode_barang}
                onChange={handleChange}
                readOnly
              />

              <FormInput
                label="Lokasi Ruangan"
                name="lokasi_ruangan"
                value={form.lokasi_ruangan}
                onChange={handleChange}
              />

              <FormSelect
                label="Kondisi Barang"
                name="kondisi"
                value={form.kondisi}
                onChange={handleChange}
                options={[
                  { value: "baik", label: "Baik" },
                  { value: "kurang baik", label: "Kurang Baik" },
                  { value: "rusak berat", label: "Rusak Berat" },
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <FormInput
                  type="number"
                  label="Jumlah (Qty)"
                  name="jumlah"
                  value={form.jumlah}
                  onChange={handleChange}
                />

                <FormInput
                  type="date"
                  label="Tahun"
                  name="tahun"
                  value={form.tahun}
                  onChange={handleChange}
                />

                <FormInput
                  type="number"
                  step="0.01"
                  label="Nilai Perolehan"
                  name="nilai_perolehan"
                  value={form.nilai_perolehan}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end space-x-3">
              <Link
                to="/laporan-kir"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200"
              >
                Kembali
              </Link>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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
  );
}

// FORM COMPONENTS — TIDAK DIUBAH
function FormInput({ label, name, value, onChange, type = "text", step, readOnly }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        step={step}
        name={name}
        value={value}
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
