import axios from 'axios'
// const axios = require('axios');

const baseURL = 'http://localhost:3001/api/snippet'

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

const createSnippet = async (snippet) => {
  try {
    const res = await axios.post(
      'http://localhost:3001/api/snippet/create',
      snippet
    )
    
    return res.data

  } catch (error) {
    console.error(error);
    return {success: false}
  }
  
}

const getSnippet = async (len, type) => {
  try {
    const res = await axios.get(
      `${baseURL}/get/lengthandtype?length=${len}&type=${type}`
    )
  
    return (res.data.success && res.data.result.length !== 0) ? res.data.result : [errSnippet];
  } catch (error) {
    console.error(error)
    return {success: false}
  }
}

export { getSnippet, createSnippet }
// module.exports = { getSnippet, createSnippet };
