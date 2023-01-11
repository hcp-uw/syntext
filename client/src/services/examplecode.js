import axios from 'axios'

const baseURL = 'http://localhost:3001'

const getEx = (len) => {
    const req = axios.get(`${baseURL}/devapi/ex/${len}`)
    return req.then(res => res.data)
}


export default {getEx}