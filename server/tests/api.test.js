const axios = require('axios')
const { 
    getSnippetByType, 
    getSnippetByLength, 
    getSnippetByID, 
    createSnippet, 
    deleteSnippetByID,
    getSnippetByLengthAndType,
    closePool,
    getPool 
} = require('../db/db');

test('createSnippet and getSnippetByid works', () => {
    const testSnippet = {
        id: -1, 
        type:'TEST',
        length: 'SHORT',
        data: ['rip', 'my', 'life']
    }
    return createSnippet(testSnippet, getPool())
        .then(() => getSnippetByID(-1).then((result) => expect(result).toContain('rip')));
})

test('deleteSnippet and getSnippetByLengthAndType works', () => {
    deleteSnippetByID(-1).then(() => {
        getSnippetByID(-1).then(res => {
            expect(res).toStrictEqual([])
        })
    })
})

test ("api is running", () => {
    return axios
        .get("http://localhost:3001/test")
        .then(res => {
            expect(res.data).toBe("hello")
        })
})

test("db controller is working", () => {
    return axios
        .get("http://localhost:3001/api/read/get/lengthandtype?length=LONG&type=WHILE_LOOP")
        .then((res) => {
            expect(res.status === 200 && res.data.length !== 0)
            .toBe(true);
        });
})


afterAll(() => closePool())