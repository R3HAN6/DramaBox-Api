import axios from "axios";

// Fungsi untuk mengambil token dari API eksternal
export async function token() {
  try {
    // Catatan: API generate token ini sewaktu-waktu bisa mati
    const res = await axios.get("https://dramabox-token.vercel.app/token");
    return res.data; // { token: "...", deviceid: "..." }
  } catch (error) {
    throw error;
  }
}
