import axios from 'axios'

const baseURL = 'http://localhost:3001'
let previousIndex = -1; // initialize the previous index to an invalid value

export default function getSnippet(len, type) {
    let snippet;
    const req = axios.get(`${baseURL}/api/read/get/lengthandtype?length=${len}&type=${type}`);
    return req.then(res => {
        let index = Math.floor(Math.random() * res.data.length);
        // generate a new index if it's the same as the previous index
        while (index === previousIndex) {
            index = Math.floor(Math.random() * res.data.length);
        }
        previousIndex = index; // update the previous index
        return res.data[index].data;
    });
}


