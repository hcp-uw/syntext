const axios = require('axios');
const bcrypt = require('bcrypt')
const {
    createUser,
    getUserID,
    deleteUser,
    authenticate,
    getPool,
    closePool
} = require('../db/user-db');
const { generateToken, saltRounds } = require('../controllers/users');

test("user-db functions: createUser, removeUser, getSalt work as intended", async () => {

    const testUser = {
        user: "elijah", 
        pw: "notgonnabehashed"
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

    const resCreate = await axios.post("http://localhost:3001/api/user/create", testUser);

    expect(resCreate.status).toBe(200);

    const resDelete = await deleteUser(testUser.username, testUser.password);

    expect(resDelete.success).toBe(true);
    expect(resDelete.deleted).toBe(testUser.username);

    const errorHopefully = await getUserID(testUser.username);

    expect(errorHopefully).toMatchObject({success: false, error: `User ${testUser.username} not found`})

})


afterAll(() => closePool())