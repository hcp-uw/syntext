const express = require('express')
const cors = require('cors')
const { getSnippetData } = require('./example_data/hardcodedsnippets')
const app = express()
app.use(cors())


// imports hard-coded data
const snippetData = getSnippetData();

app.get('/devapi/ex', (req, res) => {
  const idParam = req.query.id;
  const snippet = (idParam) ? 
    snippetData.find(snippet => snippet.id == idParam) :
    {
      error: 'Missing ID. Provide an id as a parameter',
    };
  const invalidIDResponse = {
    error: 'invalid ID. Check /example_data/hardcodedsnippets.js to see if it exists',
    invalidID: idParam
  };

  res.json(snippet || invalidIDResponse)  

})

app.get('/devapi/ex/random', (req, res) => {
  const lengthParam = req.query.length
  let length;

  if (!lengthParam) {
    res.json({
      error: 'Must specify length parameter',
    }); return;
  } 
  else if (lengthParam.toLowerCase().charAt(0) === 's') length = 'SHORT';
  else if (lengthParam.toLowerCase().charAt(0) === 'm') length = 'MED';
  else if (lengthParam.toLowerCase().charAt(0) === 'l') length = 'LONG';
  else {
    res.json({
      error: 'Invalid length parameter ' + lengthParam,
      fix: 'Please specify length with S: short, M: medium, L:long'
    }); return;
  }

  const relevantSnippets = snippetData.filter(
    snippet => snippet.length == length
  );
  const index = Math.floor(Math.random() * relevantSnippets.length);
  console.log(`${length} snippet requested. Sending snippet with id: ${relevantSnippets[index].id}`);
  res.json(relevantSnippets[index]);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Development server running on port ${PORT}`)
})
