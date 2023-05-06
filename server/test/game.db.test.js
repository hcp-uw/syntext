// Import the dependencies and the function
const axios = require('axios');
const { createUser, getUserID, deleteUser } = require('../db/user-db');
const { createGameEntry, clearGameEntries } = require('../db/game-db');
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db');

const { pool } = require('../db/pool');

const user = {username: "test", password: "password"}
const snippet = {
    id: 98,
    type: 'WHILE_LOOP',
    length: 'SHORT',
    data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
}
const baseURL = 'http://localhost:3001/api/user' 
let userID;
let token;


describe('createGameEntry', () => {

  it('should insert a new game entry and return success true', async () => {
    
    const game = {
        userID: userID, 
        snippet_id: snippet.id, 
        total_time: 30, 
        total_characters: 30, 
        wpm_data: '[1,2,3,4]', 
        wpm_avg: 4, 
        accuracy:.32, 
        num_mistakes: 5, 
    };

    const resultC = await createGameEntry(game);

    expect(resultC.success).toBe(true);

    const resultD = await clearGameEntries(userID);

    expect(resultD.success).toBe(true);
  });

  it('should return success false and an error message when the query fails', async () => {
    const result = await createGameEntry('fakedata');
    expect(result.success).toBe(false);
  });
});

describe('getGameEntry', () => {

  it('should insert a new game entry and return success true', async () => {
    
    const game = {
        userID: userID, 
        snippet_id: snippet.id, 
        total_time: 30, 
        total_characters: 30, 
        wpm_data: '[1,2,3,4]', 
        wpm_avg: 4, 
        accuracy:.32, 
        num_mistakes: 5, 
    };

    const result = await createEntry(game);

    expect(result.success).toBe(true);
  });

  it('should return success false and an error message when the query fails', async () => {
    const result = await createEntry('fakedata');
    expect(result.success).toBe(false);
  });
});


beforeAll(async () => {    
  const response = await axios.post(`${baseURL}/create`, user)
  expect(response.status).toBe(201)
  token = response.headers['authorization']
  userID = await getUserID(user.username);
  
  const createSnippetRes = await createSnippet(snippet);
  expect(createSnippetRes.success).toBe(true);
});

afterAll(async () => {
  const resDelete = await axios.delete(`${baseURL}/account`, {
      headers: {
        Authorization: token
      }
    })
  expect(resDelete.status).toBe(204)
  const resDeleteSnippet = await deleteSnippetByID(snippet.id);
  expect(resDeleteSnippet.success).toBe(true)
})