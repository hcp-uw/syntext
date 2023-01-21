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
    medium: [
        {
        id: 1, 
        SnippetType:'FOR_LOOP',
        length: 'MED',
        data: ['for (int i = 0; i < 10; i++) {',
                '\tSystem.out.println(i);',
                '}'    
        ]
        },
        {
        id: 2, 
        SnippetType:'FOR_LOOP',
        length: 'MED',  
        data: ['for (int i = 0; i < rows; i++) {',
                '\tfor (int j = 0; j < columns; j++) {',
                '\t\tSystem.out.print("[" + i + "," + j + "] ");',
                '\t}',
                '}'
        ]
        },
        {
        id: 3, 
        SnippetType:'CONDITIONAL',
        length: 'MED',
        data: ['if (hours > 8) {',
                '\treturn (rate * 8) + ((hours - 8) * (rate * 1.5));',
                '}',
                'else {',
                '\treturn rate * hours;',
                '}'
        ]  
        }  
    ],
    long: [
        {
        id: 1, 
        SnippetType:'FOR_LOOP',
        length: 'LONG',
        data: ['int j = 20;',  
                'for (int i = 0; i < 10; i++) {',  
                '\tSystem.out.print(j + “ - ” + i);', 
                '\tif (i > j)',   
                '\t\tSystem.out.println(“ < 0”)',  
                '\telse',  
                '\t\tSystem.out.println(“ > 0”)',  
                '\tj -= 1;',  
                '}' 
            ]
        },
        {
        id: 2, 
        SnippetType:'WHILE_LOOP',
        length: 'LONG',
        data: ['int total = 0;',
                'int turns = 0;',
                'while (total < max) {',
                '\tint amount = r.nextInt(6) + 1;',
                '\ttotal += amount;',
                '\tturns++',
                '\tSystem.out.println("Day " + turns + ": $" + amount + " earned");',
                '}',
                'System.out.println("You earned $" + total + "!");'
        ]
        },
        {
        id: 3, 
        SnippetType:'WHILE_LOOP',
        length: 'LONG',
        data: [
            'while (input.hasNextLine()) {',
            '\tString line = input.nextLine();',
            '\tScanner words = new Scanner(line);',
            '\tif (words.hasNext()) {',
            '\t\tSystem.out.print(words.next());',
            '\t\twhile (words.hasNext()) {',
            '\t\t\tSystem.out.print(" " + words.next());',
            '\t\t}',
            '\t}',
            '\tSystem.out.println();',
            '}'
        ]
        }
    ]
}

app.get('/devapi/ex/short', (req, res) => {
    let idNum = Math.floor(Math.random() * snippetData.short.length)
    res.send(
        snippetData.short[idNum].data
        // id: 1, 
        // SnippetType:'PRINT',
        // length: 'SHORT',
        // data: ['System.out.println("goodbye world");']
    )
})

app.get('/devapi/ex/medium', (req, res) => {
    let idNum = Math.floor(Math.random() * snippetData.medium.length)
    res.send(
        snippetData.medium[idNum].data
        // id: 2, 
        // SnippetType:'FOR_LOOP',
        // length: 'MED',
        // data: ['for (int i = 0; i < 10; i++) {',
        //     '\tSystem.out.println(i);',
        //     '}'    
        // ]
    )
})

app.get('/devapi/ex/long', (req, res) => {
    let idNum = Math.floor(Math.random() * snippetData.long.length)
    res.send(
        snippetData.long[idNum].data
        // id: 3, 
        // SnippetType:'FOR_LOOP',
        // length: 'LONG',
        // data: [ 'int j = 20;',  
        //     'for (int i = 0; i < 10; i++) {',  
        //     '\tSystem.out.print(j + “ - ” + i);', 
        //     '\tif (i > j)',   
        //     '\t\tSystem.out.println(“ < 0”)',  
        //     '\telse',  
        //     '\t\tSystem.out.println(“ > 0”)',  
        //     '\tj -= 1;',  
        //     '}' 
        //]
    )
})

// app.get('/api', (req, res) => {
//     res.send('<div>hello world</div>')
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
