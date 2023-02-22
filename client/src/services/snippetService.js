import axios from 'axios'

const baseURL = 'http://localhost:3001'

const getSnippet = (len, type) => {
    const req = axios
        .get(`${baseURL}/api/read/get/lengthandtype?length=${len}&type=${type}`)
    return req.then(res => res.data);
}