const userdb = require('./user-db');

userdb.authenticate('elijh', 'passord').then(res => console.log(res))
