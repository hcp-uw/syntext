// Import the dependencies and the function
const axios = require('axios');
const { createUser, getUserID, deleteUser } = require('../db/user-db');
const { createGameEntry, clearGameEntries, getGameEntry } = require('../db/game-db');
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

    const result = await getGameEntry(game);

    expect(result.success).toBe(true);
  });

  it('should return success false and an error message when the query fails', async () => {
    const result = await createEntry('fakedata');
    expect(result.success).toBe(false);
  });
});


describe('clearGameEntries', () => {

  it('should delete all entries for the specified user', async () => {
    const game1 = {
      userID: userID, 
      snippet_id: snippet.id, 
      total_time: 69, 
      total_characters: 69, 
      wpm_data: '[1,2,3,69]', 
      wpm_avg: 69, 
      accuracy:.69, 
      num_mistakes: 69, 
    };
    const game2 = {
      userID: userID, 
      snippet_id: snippet.id, 
      total_time: 42, 
      total_characters: 42, 
      wpm_data: '[1,2,3,42]', 
      wpm_avg: 42, 
      accuracy:.42, 
      num_mistakes: 42, 
    };

    const result1 = await createEntry(game1);
    expect(result1.success).toBe(true);

    const result2 = await createEntry(game2);
    expect(result2.success).toBe(true);

    const resultDelete = await clearGameEntries(userID);
    expect(resultDelete.success).toBe(true);

    const resultGet = await getGameEntry(userID);

    expect(result.error).toBe(undefined);
    expect(result[0].length).toBe(0);

  })

})


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