import axios from "axios";
import { token } from "./get-token.js";

async function getStream(bookId, episode) {
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
            index: episode,
            currencyPlaySource: "discover_new_rec_new",
            needEndRecommend: 0,
            currencyPlaySourceName: "",
            preLoad: false,
            rid: "",
            pullCid: "",
            loadDirection: 0,
            startUpKey: "",
            bookId
        };
        const res = await axios.post(url, data, { headers });
        const chapter = res.data.data.chapterList[0];
        const videos = chapter.cdnList
            .filter(v => v.videoPath)
            .map(v => ({
                quality: v.quality,
                videoPath: v.videoPath
            }));
        const result = {
            bookId,
            episode,
            title: chapter.title || `Episode ${episode}`,
            description: chapter.description || "Tidak ada deskripsi tersedia",
            chapterId: chapter.chapterId,
            videos
        };
        return result;
    } catch (error) {
        return { error: error.message };
    }
}

export { getStream };
