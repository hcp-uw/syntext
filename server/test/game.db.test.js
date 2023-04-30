// Import the dependencies and the function
const mysql = require('mysql2');
const { createUser, getUserID, deleteUser } = require('../db/user-db');
const { createEntry } = require('../db/game-db');
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db');

const { pool } = require('../db/pool');

const user = {username: "elijah", password: "password"}
const snippet = {
    id: 6,
    type: 'WHILE_LOOP',
    length: 'SHORT',
    data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
}
let userID;
beforeAll(async () => {    
    const createUserRes = await createUser(user);
    expect(createUserRes.success).toBe(true);

    userID = await getUserID(user.username);
    
    const createSnippetRes = await createSnippet(snippet1);
    expect(createSnippetRes.success).toBe(true);
});

afterAll(async () => {
    const deleteUserRes = await deleteUser(user.username, user.password);
    expect(deleteUserRes.success).toBe(true);

    const deleteSnippetRes = await deleteSnippetByID(snippet.id);
    expect(deleteSnippetRes.success).toBe(true);
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


