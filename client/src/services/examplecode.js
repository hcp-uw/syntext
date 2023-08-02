import axios from 'axios'

const baseURL = 'https://syntext.herokuapp.com/'

const getEx = len => {
  const req = axios.get(`${baseURL}/devapi/ex?length=${len}`)
  return req.then(res => res.data)
}

export default { getEx }
