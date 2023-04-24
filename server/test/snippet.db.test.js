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


describe('getSnippetByType', () => {
  it('should return a success response when query is successful', async () => {
    const snippet1 = {
      id: 6969,
      type: 'WHILE_LOOP',
      length: 'SHORT',
      data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
    }

    const snippet2 = {
      id: 8,
      type: 'WHILE_LOOP',
      length: 'SHORT',
      data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
    }

    const snippet3 = {
      id: 6,
      type: 'WHILE_LOOP',
      length: 'SHORT',
      data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
    }

    const snippets = [snippet1, snippet2, snippet3];

    await snippets.forEach(async (snippet, i) => {
      const createRes = await createSnippet(snippet);
      expect(createRes.success).toBe(true);
      const result = await getSnippetByType(snippet.type);

      console.log(result);

      expect(result.length).toBe(i + 1);
      
      expect(result[0].type).toBe("WHILE_LOOP");
    })

    await snippets.forEach(async snippet => {
      const deleteRes = await deleteSnippetByID(snippet.id)
      expect(deleteRes.success).toBe(true);
    });
  });

  it('should return empty array when no matching snippet', async () => {
    // arrange
    const type = 'fake-type';

    // act
    const result = await getSnippetByType(type);

    // assert
    
  });

  it('should handle edge cases gracefully (return empty array)', async () => {
    // arrange
    const type = null;

    // act
    const result = await getSnippetByType(type);

    // assert
    expect(result.length).toBe(0);
  });
});





// test('createSnippet and getSnippetByid works', async () => {
//   const testSnippet = {
//     id: -1,
//     type: 'TEST',
//     length: 'SHORT',
//     data: ['rip', 'my', 'life']
//   }
//   await createSnippet(testSnippet)
//   const result_1 = await getSnippetByID(-1)
//   return expect(result_1.data).toContain('rip')
// })

// test('delete and get nonexistant snippet returns error', async () => {
//   await deleteSnippetByID(-1)
//   const res = await getSnippetByID(-1)
//   const errorMessage = { Message: 'No snippet with id -1 found.' }
//   expect(res).toMatchObject({})
// })


// test('db controller is working', async () => {
//   try {
//     const testSnippet = {
//       id: -1,
//       type: 'TEST',
//       length: 'SHORT',
//       data: ['rip', 'my', 'life']
//     }
//     await createSnippet(testSnippet)
//     const res = await getSnippetByType('TEST');
//     expect(res.length).toBe(1)
//   } catch (error) {
//     console.error(error)
//   }
// })



//afterAll(() => closePool())
