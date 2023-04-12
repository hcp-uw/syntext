import axios from 'axios'

const baseURL = 'https://syntext.herokuapp.com'

const errSnippet =  {
    id: 1,
    SnippetType:'ERROR',
    length: 'NA',
    data: [
        'public static void main(String[] args) {',
        '\tSystem.out.println("no snippet found :(");',
        '}'
    ]
}

export default function getSnippet(len, type) {
    let previousIndex = -1; // initialize the previous index to an invalid value
    const req = axios.get(`${baseURL}/api/read/get/lengthandtype?length=${len}&type=${type}`);
    return req.then(res => {
        if (res.status === 200 && res.data.length !== 0) {
            let index = Math.floor(Math.random() * res.data.length);
            // generate a new index if it's the same as the previous index
            while (index === previousIndex) {
                index = Math.floor(Math.random() * res.data.length);
            }
            previousIndex = index; // update the previous index
            return res.data[index].data;
        } else return errSnippet.data;
    });
}


