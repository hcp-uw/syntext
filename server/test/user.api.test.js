test("userRouter endpoints: /create, /delete work as intended", async () => {
    const testUser = {
        username: "elijah2", 
        password: "aDUmbPaSsw0rd!" 
    }
    const res = await axios.post("http://localhost:3001/api/user/create", testUser);
    expect(res.status).toBe(200);
    expect(res.headers.authorization.startsWith('Bearer ')).toBe(true);
    const token = res.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, JWT_SECRET);
    expect(decoded.username).toBe(testUser.username);
    const resDelete = await deleteUser(testUser.username, testUser.password);
    expect(resDelete.success).toBe(true);
    expect(resDelete.deleted).toBe(testUser.username);
    const errorHopefully = await getUserID(testUser.username);
    expect(errorHopefully).toMatchObject({success: false, error: `User ${testUser.username} not found`})
})

test("userRouter endpoint: /create, /login, /me (delete) work as intended", async () => {
    // Create a test user
    const testLoginUser = { username: 'thefirsttologin', password: 'testpassword' }
    const createUserRes = await axios.post('http://localhost:3001/api/user/create', testLoginUser);//.then(res => expect(res.status).toBe(200))
    expect(createUserRes.status).toBe(200)
    // Log in with the test user
    const loginRes = await axios.post('http://localhost:3001/api/user/login', testLoginUser)
    expect(loginRes.status).toBe(200)
    //expect(typeof loginRes.data).toBe('object')
    expect(loginRes.data.success).toBe(true)

    const token = loginRes.headers.authorization
    // Delete the test user
    const deleteUserRes = await axios.delete(
        'http://localhost:3001/api/user/account', 
        {
            headers: {"Authorization" : token}
        }
    )
    return expect(deleteUserRes.status).toBe(204)
    return deleteUserRes;
})