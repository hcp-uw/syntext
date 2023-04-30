const axios = require('axios');
const baseURL = 'http://localhost:3001/api/games' //??
const { createUser, getUserID, deleteUser } = require('../db/user-db');
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db');

const user = {username: 'KitKat', password: '123password'};
let userID;
beforeAll(async () => {    
    const createUserRes = await createUser(user.username);
    expect(createUserRes.success).toBe(true);

    userID = await getUserID(user.username);
    
    const createSnippetRes = await createSnippet(snippet1);
    expect(createSnippetRes.success).toBe(true);
});

describe('POST /create', () => {
    it('returns 400 if missing required fields', async () => {
        try {
          const response = await axios.post(`${baseURL}/create`, {
            userID: test123,
            snippet_id: 35,
            total_time : 30,
            total_characters: "total_characters", 
            wpm_data: [99, 100, 101],
            wpm_avg: 100,
            accuracy: 88,
            num_mistakes: 5,
          })
        } catch (error) {
          expect(error.response.status).toBe(400)
          expect(error.response.data.success).toBe(false)
          expect(error.response.data.error).toBe('Missing required fields')
        }
    })
});

afterAll(async () => {
    const deleteUserRes = await deleteUser(user.username, user.password);
    expect(deleteUserRes.success).toBe(true);

    const deleteSnippetRes = await deleteSnippetByID(snippet.id);
    expect(deleteSnippetRes.success).toBe(true);
})
