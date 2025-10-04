import axios from "axios";
import { token } from "./get-token.js";

export default async function handler(req, res) {
    try {
        const gettoken = await token();
        const url = "https://sapi.dramaboxdb.com/drama-box/chapterv2/batch/load";

        const headers = {
            "User-Agent": "okhttp/4.10.0",
            "Accept-Encoding": "gzip",
            "Content-Type": "application/json",
            "tn": `Bearer ${gettoken.token}`,
            "version": "430",
            "vn": "4.3.0",
            "cid": "DRA1000000",
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
            boundaryIndex: 0,
            comingPlaySectionId: -1,
            index: 1,
            currencyPlaySource: "discover_new_rec_new",
            needEndRecommend: 0,
            currencyPlaySourceName: "",
            preLoad: false,
            rid: "",
            pullCid: "",
            loadDirection: 0,
            startUpKey: "",
            bookId: "41000102902"
        };

        const response = await axios.post(url, data, { headers });
        // kirim response ke client
        res.status(200).json(response.data.data.chapterList[0].cdnList[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
