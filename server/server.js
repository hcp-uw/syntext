const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const snippetData = {
    short: [
        {
        id: 1, 
        SnippetType:'PRINT',
        length: 'SHORT',
        data: ['System.out.println("goodbye world");']
        },
        {
        id: 2,
        SnippetType: 'PRINT',
        length: 'SHORT',
        data: ['String myCat = "Matilda";',
            'System.out.println(myCat.charAt(3));'
        ] 
        },
        {
        id: 3,
        SnippetType: 'PRINT',
        length: 'SHORT',
        data: ['int sum = myCat.length() - myGod.length();',
            'System.out.println(sum);'
        ]
        }    
    ],
    medium: [],
    long: []
}

app.get('/devapi/ex/short', (req, res) => {
    const idNum = Math.floor(Math.random * snippetData.short.length)
    res.send({
        snippetData.short[idNum].data
        // id: 1, 
        // SnippetType:'PRINT',
        // length: 'SHORT',
        // data: ['System.out.println("goodbye world");']
    })
})

app.get('/devapi/ex/medium', (req, res) => {
    res.send({
        id: 2, 
        SnippetType:'FOR_LOOP',
        length: 'MED',
        data: ['for (int i = 0; i < 10; i++) {',
            '\tSystem.out.println(i);',
            '}'    
        ]
    })
})

app.get('/devapi/ex/long', (req, res) => {
    res.send({
        id: 3, 
        SnippetType:'FOR_LOOP',
        length: 'LONG',
        data: [ 'int j = 20;',  
            'for (int i = 0; i < 10; i++) {',  
            '\tSystem.out.print(j + “ - ” + i);', 
            '\tif (i > j)',   
            '\t\tSystem.out.println(“ < 0”)',  
            '\telse',  
            '\t\tSystem.out.println(“ > 0”)',  
            '\tj -= 1;',  
            '}' 
        ]
    })
})

// app.get('/api', (req, res) => {
//     res.send('<div>hello world</div>')
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
