const express = require('express')
const cors = require('cors')
const { getSnippetData } = require('./example_data/hardcodedsnippets')
const app = express()
app.use(cors())

const snippetData = getSnippetData();

// app.get('/devapi/ex/short', (req, res) => {
//     let idNum = Math.floor(Math.random() * snippetData.short.length)
//     res.send(
//         snippetData.short[idNum].data
//     )
// })

// app.get('/devapi/ex/medium', (req, res) => {
//     let idNum = Math.floor(Math.random() * snippetData.medium.length)
//     res.send(
//         snippetData.medium[idNum].data

//     )
// })

// app.get('/devapi/ex/long', (req, res) => {
//     let idNum = Math.floor(Math.random() * snippetData.long.length)
//     res.send(
//         snippetData.long[idNum].data
//     )
// })

app.get('/devapi/ex', (req, res) => {
    const length = req.query.length
    let idNum = Math.floor(Math.random() * snippetData.long.length)
    res.send(
        snippetData[length][idNum].data
    )
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Development server running on port ${PORT}`)
})
