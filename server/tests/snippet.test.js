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
} = require('../db/snippet-db');

test('createSnippet and getSnippetByid works', () => {
    const testSnippet = {
        id: -1, 
        type:'TEST',
        length: 'SHORT',
        data: ['rip', 'my', 'life']
    }
    return createSnippet(testSnippet, getPool())
        .then(() => getSnippetByID(-1).then((result) => expect(result.data).toContain('rip')));
})

test('deleteSnippet and getSnippetByLengthAndType works', async () => {
    await deleteSnippetByID(-1)
    const res = getSnippetByID(-1);
    const errorMessage = {Message: "No snippet with id -1 found."};
    expect(res).toMatchObject({});
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

test("editSnippet endpoints working", async () => {
    const postedSnippet = {
        "id": "6969", 
        "type": "NOT WHILE LOOP", 
        "length": "NOT SHORT", 
        "data": ["THIS IS TESTING DATA", "\tSystem.out.println(i);"]
    };

    const res = await axios.post('http://localhost:3001/api/edit/mksnippet', postedSnippet);

    expect(res.status).toBe(201);

    const snippet = await axios.get('http://localhost:3001/api/read/get/id?id=6969');

    expect(snippet.data).toMatchObject(postedSnippet);

    const delRes = await axios.delete('http://localhost:3001/api/edit/delsnippet?id=6969');

    expect(delRes.status).toBe(202);

    // snippet = await axios.get('http://localhost:3001/api/read/get/id?id=6969');

    // expect(snippet.status).toBe(404);

    
})


afterAll(() => closePool())