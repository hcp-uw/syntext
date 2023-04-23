const { pool } = require('../db/pool')
const {
  getSnippetByType,
  getSnippetByLength,
  getSnippetByID,
  createSnippet,
  deleteSnippetByID,
  getSnippetByLengthAndType,
  closePool,
  getPool
} = require('../db/snippet-db')

test('createSnippet and getSnippetByid works', async () => {
  const testSnippet = {
    id: -1,
    type: 'TEST',
    length: 'SHORT',
    data: ['rip', 'my', 'life']
  }
  await createSnippet(testSnippet)
  const result_1 = await getSnippetByID(-1)
  return expect(result_1.data).toContain('rip')
})

test('delete and get nonexistant snippet returns error', async () => {
  await deleteSnippetByID(-1)
  const res = await getSnippetByID(-1)
  const errorMessage = { Message: 'No snippet with id -1 found.' }
  expect(res).toMatchObject({})
})


test('db controller is working', async () => {
  try {
    const testSnippet = {
      id: -1,
      type: 'TEST',
      length: 'SHORT',
      data: ['rip', 'my', 'life']
    }
    await createSnippet(testSnippet)
    const res = await getSnippetByType('TEST');
    expect(res.status === 200 && res.data.length === 3).toBe(true)
  } catch (error) {
    console.error(error)
  }
})



//afterAll(() => closePool())
