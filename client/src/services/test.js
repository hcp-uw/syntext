const { getSnippet } = require("./snippetService");

getSnippet("LONG", "WHILE").then(res => console.log(res));