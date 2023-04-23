const axios = require('axios');
const {
    createUser,
    getSalt,
    authenticate,
    getPool,
    closePool
} = require('../db/user-db');

test("Created user exists", async () => {
    const res = await createUser(
        "elijah", 
        "dumbPassword123!", 
        "aSuperSpecialSalt"
    );

    expect(res).toMatchObject({outcome: "success", created: "elijah"});

    const salt = await getSalt("elijah");
    expect(salt).toBe("aSuperSpecialSalt");
})


afterAll(() => closePool())