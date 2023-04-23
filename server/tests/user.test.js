const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const {
    createUser,
    getUserID,
    deleteUser,
    authenticate,
    getPool,
    closePool
} = require('../db/user-db');
const { saltRounds } = require('../controllers/users');


test("user-db functions: createUser, removeUser, getSalt work as intended", async () => {
    const testUser = {
        user: "elijah", 
        pw: "ohno"
    }
    const resCreate = await createUser(testUser.user, await bcrypt.hash(testUser.pw, saltRounds));
    expect(resCreate).toMatchObject({success: true, created: testUser.user});  
    const resDelete = await deleteUser(testUser.user, testUser.pw);
    expect(resDelete.success).toBe(true);
    expect(resDelete.deleted).toBe(testUser.user);
    const errorHopefully = await getUserID(testUser.user);
    expect(errorHopefully).toMatchObject({success: false, error: `User ${testUser.user} not found`})
})


test("userRouter endpoints: /create, /delete work as intended", async () => {
    const testUser = {
        username: "elijah2", 
        password: "aDUmbPaSsw0rd!" 
    }
    const res = await axios.post("http://localhost:3001/api/user/create", testUser);
    expect(res.status).toBe(200);
    expect(res.headers.authorization.startsWith('Bearer ')).toBe(true);
    const token = res.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.username).toBe(testUser.username);
    const resDelete = await deleteUser(testUser.username, testUser.password);
    expect(resDelete.success).toBe(true);
    expect(resDelete.deleted).toBe(testUser.username);
    const errorHopefully = await getUserID(testUser.username);
    expect(errorHopefully).toMatchObject({success: false, error: `User ${testUser.username} not found`})
})

afterAll(() => closePool())