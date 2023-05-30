import axios from 'axios'
// const axios = require('axios');

const baseURL = 'https://syntext.herokuapp.com/api/snippet'

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
      `${baseURL}/create`,
      snippet
    )
    
    if (res.status === 201) return {success: true}
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
  
    return (res.status === 200 && res.data.length !== 0) ? res.data : [errSnippet];
  } catch (error) {
    console.error(error)
    return [errSnippet]
  }
}

export { getSnippet, createSnippet }
// module.exports = { getSnippet, createSnippet };
