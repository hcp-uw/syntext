const axios = require('axios');

describe('Snippet API', () => {
  const postedSnippet = {
    id: 6969,
    type: 'WHILE_LOOP',
    length: 'SHORT',
    data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
  }

  test('create a new snippet', async () => {
    const res = await axios.post(
      'http://localhost:3001/api/snippet/create',
      postedSnippet
    )

    expect(res.status).toBe(201)
    expect(res.data).toBe("Snippet created")
    await axios.delete(
      'http://localhost:3001/api/snippet/remove?id=6969'
    )
  })

  test('get a snippet by ID', async () => {
    await axios.post(
      'http://localhost:3001/api/snippet/create',
      postedSnippet
    )

    const res = await axios.get(
      'http://localhost:3001/api/snippet/get/id?id=6969'
    )

    expect(res.status).toBe(200)
    expect(res.data).toMatchObject(postedSnippet)
  })

  test('delete a snippet by ID', async () => {
    await axios.post(
      'http://localhost:3001/api/snippet/create',
      postedSnippet
    )
    const res = await axios.delete(
      'http://localhost:3001/api/snippet/remove?id=6969'
    )

    expect(res.status).toBe(202)
    expect(res.data).toBe("Snippet deleted")
  })

  test('get snippets by length', async () => {
    await axios.post(
      'http://localhost:3001/api/snippet/create',
      postedSnippet
    )
    const res = await axios.get(
      'http://localhost:3001/api/snippet/get/length?length=SHORT'
    )

    expect(res.status).toBe(200)
    expect(res.data).toMatchObject([postedSnippet])
  })

  test('get snippets by length and type', async () => {
    await axios.post(
      'http://localhost:3001/api/snippet/create',
      postedSnippet
    )

    const res = await axios.get(
      'http://localhost:3001/api/snippet/get/lengthandtype?length=SHORT&type=WHILE_LOOP'
    )

    expect(res.status).toBe(200)
    expect(res.data).toMatchObject([postedSnippet])
  })

  test('get snippets by type', async () => {
    await axios.post(
      'http://localhost:3001/api/snippet/create',
      postedSnippet
    )
    
    const res = await axios.get(
      'http://localhost:3001/api/snippet/get/type?type=WHILE_LOOP'
    )

    expect(res.status).toBe(200)
    expect(res.data).toMatchObject([postedSnippet])
  })

  test('handle error when creating a new snippet with missing data', async () => {
    const snippetObject = {
      id: '1234',
      type: 'WHILE LOOP',
      length: 'SHORT'
    }

    try {
      await axios.post(
        'http://localhost:3001/api/snippet/create',
        snippetObject
      )
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data).toBe('Bad Request: Missing data in request body')
    }
  })

  test('handle error when creating a new snippet with invalid data', async () => {
    const snippetObject = {
      id: '1234',
      type: 'WHILE LOOP',
      length: 'SHORT',
      data: 'invalid data'
    }

    try {
      await axios.post(
        'http://localhost:3001/api/snippet/create',
        snippetObject
      )
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data).toBe('Bad Request: Invalid data in request body')
    }
  })

  test('handle error when getting a snippet with missing ID', async () => {
    try {
      await axios.get(
        'http://localhost:3001/api/snippet/get/id'
      )
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data).toBe('Bad Request: Missing id parameter')
    }
  })

  test('handle error when deleting a snippet with missing ID', async () => {
    try {
      await axios.delete('http://localhost:3001/api/snippet/remove')
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('handle error when retrieving a snippet with missing ID', async () => {
    try {
      await axios.get('http://localhost:3001/api/snippet/get/id')
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('handle error when creating a snippet with missing data', async () => {
    const snippet = {
      id: '1234',
      type: 'FOR LOOP',
      length: 'SHORT'
    }
  
    try {
      await axios.post('http://localhost:3001/api/snippet/create', snippet)
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('handle error when creating a snippet with invalid data', async () => {
    const snippet = {
      id: '1234',
      type: 'FOR LOOP',
      length: 'SHORT',
      data: 'invalid data'
    }
  
    try {
      await axios.post('http://localhost:3001/api/snippet/create', snippet)
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('handle error when retrieving snippets by type with missing type', async () => {
    try {
      await axios.get('http://localhost:3001/api/snippet/get/type')
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('handle error when retrieving snippets by length and type with missing length', async () => {
    try {
      await axios.get('http://localhost:3001/api/snippet/get/lengthandtype?type=FOR%20LOOP')
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('handle error when retrieving snippets by length and type with missing type', async () => {
    try {
      await axios.get('http://localhost:3001/api/snippet/get/lengthandtype?length=SHORT')
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })
  
  test('api is running', async () => {
    const res = await axios.get('http://localhost:3001/test')
    expect(res.data).toBe('hello')
  })
})  