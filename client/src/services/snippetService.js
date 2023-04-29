import axios from 'axios'
//const axios = require('axios');

const baseURL = 'http://localhost:3001'

const errSnippet = {
  id: -1,
  SnippetType: 'ERROR',
  length: 'NA',
  data: [
    'public static void main(String[] args) {',
    '\tSystem.out.println("no snippet found :(");',
    '}'
  ]
}

const getSnippet = (len, type) => {
  const req = axios.get(
    `${baseURL}/api/read/get/lengthandtype?length=${len}&type=${type}`
  )
  return req.then(res => {
    return res.status === 200 && res.data.length !== 0 ? res.data : [errSnippet]
  })
}

export default getSnippet
//module.exports = {getSnippet};
