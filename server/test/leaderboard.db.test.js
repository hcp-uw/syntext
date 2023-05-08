//const { getLeaderboardData } = require('../db/leaderboard-db')
const { getUserID } = require('../db/user-db');
const mysql = require('mysql2');
const { getLeaderboardData } = require('../db/leaderboard-db');
const axios = require('axios');

const baseURL = 'http://localhost:3001/api'

beforeAll(async () => {

    const usernames = ['elijah', 'kai', 'harshi'];
    let users = await usernames.map(u => { return {username: u, password: 'passWord'} })

    for (let user of users) {
        const res = await axios.post(`${baseURL}/user/create`, user);
        expect(res.status).toBe(201)
    }

    
    let updatedUsers = [];
    for (let user of users) {
        const id = await getUserID(user.username);
        updatedUsers.push({...user, userID: id});
    }

    users = updatedUsers;

    const snippets = ([1, 2, 3, 4, 5]).map(id => { return {
        id: id,
        type: 'TEST',
        length: 'LONG',
        data: '[1, 2, 3, 4]'
    }})

    for (let snippet of snippets) {
        const res = await axios.post(`${baseURL}/snippet/create`, snippet);
        expect(res.status).toBe(201);
    }

    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        for (let j = 0; j < snippets.length; j++) {
            const s = snippets[j];
            const res = await axios.post(`${baseURL}/game/create`, {
                userID: u.userID,
                snippet_id: s.id,
                total_time: i * i * j,
                total_characters: (i * j * 37 + 1) % 4,
                wpm_data: '[1, 2, 3]',
                wpm_avg: i + j,
                accuracy: i + j,
                num_mistakes: (i * j + i * j)
            });
            expect(res.status).toBe(201);
        }
    }

})

describe('getLeaderboardData', () => {
    it('should return data', async () => {
        const data = await getLeaderboardData('wpm');
        console.log(data);
        expect(data.length).toBe(3);
        
    });
})

afterAll(() => {
    console.log('tear down');
})