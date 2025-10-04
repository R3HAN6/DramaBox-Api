import axios from 'axios';
import { token } from './get-token.js';

export default async function handler(req, res) {
  try {
    const gettoken = await token(); // panggil token() dalam fungsi async
    const url = "https://sapi.dramaboxdb.com/drama-box/he001/theater";

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

    const data = {
      newChannelStyle: 1,
      isNeedRank: 1,
      pageNo: 1,
      index: 1,
      channelId: 43
    };

    const response = await axios.post(url, data, { headers });
    res.status(200).json(response.data.data.newTheaterList.records); // kirim ke client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // kirim error ke client
  }
}
