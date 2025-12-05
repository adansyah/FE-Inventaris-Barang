import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";

export default function UpdateDataKir() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [kibs, setKibs] = useState([]);

  const [form, setForm] = useState({
    kib_id: "",
    nama_barang: "",
    kode_barang: "",
    tahun: "",
    lokasi: "",
    kondisi: "baik",
    jumlah: "",
    nilai_perolehan: "",
  });

  // === AMBIL KIB ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/kib", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setKibs(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // === AMBIL DATA KIR BERDASARKAN ID ===
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8000/api/kir/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const d = res.data.data;

        setForm({
          kib_id: d.kib_id,
          nama_barang: d.nama_barang,
          kode_barang: d.kode_barang,
          tahun: d.tahun,
          lokasi: d.lokasi,
          kondisi: d.kondisi,
          jumlah: d.jumlah,
          nilai_perolehan: d.nilai_perolehan,
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // === HANDLE INPUT ===
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // Jika lokasi diubah, reset dropdown KIB
    if (name === "lokasi") {
      setForm((prev) => ({
        ...prev,
        kib_id: "",
        nama_barang: "",
        kode_barang: "",
      }));
    }

    // Auto-fill berdasarkan kib_id
    if (name === "kib_id") {
      const selected = kibs.find((k) => k.id == value);
      if (selected) {
        setForm((prev) => ({
          ...prev,
          kode_barang: selected.kode_barang || selected.kode_kib,
          nama_barang: selected.nama_barang,
        }));
      }
    }
  };

  // FILTER KIB BERDASARKAN LOKASI DIPILIH
  const filteredKibs = kibs.filter((k) => k.lokasi === form.lokasi);

  // === SUBMIT UPDATE ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:8000/api/kir/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/laporan-kir");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="print:hidden hidden lg:block ">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="print:hidden">
          <Header activeMenuLabel="Edit Data KIR" />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">

            {/* ===================== DETAIL ===================== */}
            <div className="bg-white shadow-md p-4 md:p-6 rounded-md">
              <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center">
                Detail Data KIR
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
                <ShowItem label="Nama Barang" value={form.nama_barang} />
                <ShowItem label="Kode Barang" value={form.kode_barang} />
                <ShowItem label="Lokasi Ruangan" value={form.lokasi} />
                <ShowItem label="Kondisi" value={form.kondisi} />
                <ShowItem label="Jumlah" value={form.jumlah} />
                <ShowItem label="Tahun" value={form.tahun} />
                <ShowItem
                  label="Nilai Perolehan"
                  value={`Rp ${parseInt(form.nilai_perolehan).toLocaleString("id-ID")}`}
                />
              </div>
            </div>

            {/* ===================== FORM ===================== */}
            <div className="bg-white shadow-md p-4 md:p-6 rounded-md">
              <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center">
                Update Data KIR
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <Input label="Nama Barang" name="nama_barang" value={form.nama_barang} onChange={handleChange} />

                  <Select
                    label="Lokasi Ruangan"
                    name="lokasi"
                    value={form.lokasi}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "-- Pilih Ruangan --" },
                      { value: "aula", label: "Aula" },
                      { value: "gedung a", label: "Gedung A" },
                      { value: "gedung b", label: "Gedung B" },
                      { value: "gedung c", label: "Gedung C" },
                      { value: "gedung d", label: "Gedung D" },
                    ]}
                  />

                  <Select
                    label="Jenis KIB (berdasarkan lokasi)"
                    name="kib_id"
                    value={form.kib_id}
                    onChange={handleChange}
                    options={[
                      { value: "", label: filteredKibs.length === 0 ? "Tidak ada KIB di lokasi ini" : "-- Pilih KIB --" },
                      ...filteredKibs.map((k) => ({
                        value: k.id,
                        label: `${k.nama_barang} - ${k.kode_barang || k.kode_kib}`,
                      })),
                    ]}
                  />

                  <Input label="Kode Barang" name="kode_barang" value={form.kode_barang} readOnly />

                  <Select
                    label="Kondisi"
                    name="kondisi"
                    value={form.kondisi}
                    onChange={handleChange}
                    options={[
                      { value: "baik", label: "Baik" },
                      { value: "kurang baik", label: "Kurang Baik" },
                      { value: "rusak berat", label: "Rusak Berat" },
                    ]}
                  />

                  <Input type="number" label="Jumlah" name="jumlah" value={form.jumlah} onChange={handleChange} />

                  <Input type="date" label="Tahun" name="tahun" value={form.tahun} onChange={handleChange} />

                  <Input
                    type="number"
                    step="0.01"
                    label="Nilai Perolehan"
                    name="nilai_perolehan"
                    value={form.nilai_perolehan}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                  <Link
                    to={"/laporan-kir"}
                    className="w-full text-center sm:w-auto px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
                  >
                    Kembali
                  </Link>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Update Data
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// ======================================= COMPONENTS =======================================

const ShowItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value || "-"}</p>
  </div>
);

function Input({ label, name, value, onChange, type = "text", step, readOnly }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        step={step}
        readOnly={readOnly}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      >
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
