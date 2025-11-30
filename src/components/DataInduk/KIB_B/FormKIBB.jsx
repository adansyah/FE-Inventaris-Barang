import { useEffect, useState } from "react";
import axios from "axios";

import React from 'react'

function FormKIBB() {
    const [kibs, setKibs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchKIB = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/kib", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setKibs(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKIB();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Data KIB</h2>

            <table className="w-full border border-gray-300 rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">Kode Barang</th>
                        <th className="p-2 border">Nama Barang</th>
                        <th className="p-2 border">Type KIB</th>
                        <th className="p-2 border">Lokasi</th>
                        <th className="p-2 border">Nilai Perolehan</th>
                        <th className="p-2 border">QR</th>
                    </tr>
                </thead>
                <tbody>
                    {kibs.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className="p-2 border">{item.kode_barang}</td>
                            <td className="p-2 border">{item.nama_barang}</td>
                            <td className="p-2 border">{item.type_kib}</td>
                            <td className="p-2 border">{item.lokasi}</td>
                            <td className="p-2 border">Rp {item.nilai_perolehan}</td>
                            <td className="p-2 border">
                                {item.gambar_qr ? (
                                    <img
                                        src={`http://localhost:8000/storage/${item.gambar_qr}`}
                                        className="w-20 mx-auto"
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default FormKIBB
