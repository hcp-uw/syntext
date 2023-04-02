const axios = require('axios')

test ("api is running", () => {
    return axios
        .get("http://localhost:3001/test")
        .then(res => {
            expect("nothello").toBe("hello")
        })
        
})