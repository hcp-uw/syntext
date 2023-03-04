import axios from 'axios'

const baseURL = 'http://localhost:3001'


//include the id of the snippet
export default function getSnippet (len, type) {
    let snippet;
    const req = axios
        .get(`${baseURL}/api/read/get/lengthandtype?length=${len}&type=${type}`)
    return req.then(res => {
        const index = Math.floor(Math.random() * res.data.length)
        return res.data[index].data
    });
}

