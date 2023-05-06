const { closePool } = require('../db/pool');
const {
  getSnippetByType,
  getSnippetByLength,
  getSnippetByID,
  createSnippet,
  deleteSnippetByID,
  getSnippetByLengthAndType,
} = require('../db/snippet-db')


describe('getSnippetByType', () => {
  it('should return the correct data', async () => {
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

    const createRes1 = await createSnippet(snippet1);
    expect(createRes1.success).toBe(true);
    const result1 = await getSnippetByType(snippet1.type);

    expect(result1.length).toBe(1);
    expect(result1[0].type).toBe("WHILE_LOOP");

    const createRes2 = await createSnippet(snippet2);
    expect(createRes2.success).toBe(true);
    const result2 = await getSnippetByType(snippet2.type);

    expect(result2.length).toBe(2);
    expect(result2[0].type).toBe("WHILE_LOOP");
    
    const createRes3 = await createSnippet(snippet3);
    expect(createRes3.success).toBe(true);
    const result3 = await getSnippetByType(snippet3.type);

    expect(result3.length).toBe(3);
    expect(result3[0].type).toBe("WHILE_LOOP");
    
    const deleteRes1 = await deleteSnippetByID(snippet1.id)
    expect(deleteRes1.success).toBe(true);

    const deleteRes2 = await deleteSnippetByID(snippet2.id)
    expect(deleteRes2.success).toBe(true);

    const deleteRes3 = await deleteSnippetByID(snippet3.id)
    expect(deleteRes3.success).toBe(true);
  });

  it('should return empty array when no matching snippet', async () => {
    const type = 'fake-type';

    const result = await getSnippetByType(type);

    expect(result.length).toBe(0);
  });

  it('should handle missing param', async () => {
    const type = null;

    const result = await getSnippetByType(type);

    expect(result.success).toBe(false);
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



afterAll(() => closePool())
