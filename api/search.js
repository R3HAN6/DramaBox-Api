import axios from 'axios';
import { token } from './get-token.js';

export default async function handler(req, res) {
  try {
    const gettoken = await token();
    const url = "https://sapi.dramaboxdb.com/drama-box/search/suggest";

    const headers = {
      "User-Agent": "okhttp/4.10.0",
      "Accept-Encoding": "gzip",
      "Content-Type": "application/json",
      "tn": `Bearer ${gettoken.token}`,
      "version": "430",
      "vn": "4.3.0",
      "cid": "DRA1000042",
      "package-name": "com.storymatrix.drama",
      "apn": "1",
      "device-id": gettoken.deviceid,
      "language": "in",
      "current-language": "in",
      "p": "43",
      "time-zone": "+0800",
      "content-type": "application/json; charset=UTF-8"
    };

    // Ambil keyword dari query string, default "pewaris" kalau kosong
    const keyword = req.query.query || "pewaris";

    const data = { keyword };

    const response = await axios.post(url, data, { headers });
    
    res.status(200).json(response.data.data.suggestList); // kirim ke client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
