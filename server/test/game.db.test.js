// Import the dependencies and the function
const axios = require('axios');
const { createUser, getUserID, deleteUser } = require('../db/user-db');
const { createEntry } = require('../db/game-db');
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db');

const { pool } = require('../db/pool');

const user = {username: "test", password: "password"}
const snippet = {
    id: 22,
    type: 'WHILE_LOOP',
    length: 'SHORT',
    data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
}
const baseURL = 'http://localhost:3001/api/user' 
let userID;
let token;

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
})

describe('createEntry', () => {

  it('should insert a new game entry and return success true', async () => {
    /*
     id, userID, snippet_id, total_time, total_characters, wpm_data, wpm_avg, accuracy, num_mistakes, time_stamp
    */
    
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
    expect(result.message).toBe('Entry created successfully.');
  });

  it('should return success false and an error message when the query fails', async () => {





    const result = await createEntry(game);


    expect(result.success).toBe(false);

  });
});


