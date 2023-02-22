
const getSnippetData = () => {
    return [
        {
            id: 1, 
            type:'PRINT',
            length: 'SHORT',
            data: ['System.out.println("goodbye world");']
        },
        {
            id: 2,
            type: 'PRINT',
            length: 'SHORT',
            data: ['String myCat = "Matilda";',
                    'System.out.println(myCat.charAt(3));'
            ] 
        },
        {
            id: 3,
            type: 'PRINT',
            length: 'SHORT',
            data: ['int sum = myCat.length() - myGod.length();',
                    'System.out.println(sum);'
            ]
        },
        {
            id: 4, 
            type:'FOR_LOOP',
            length: 'MED',
            data: ['for (int i = 0; i < 10; i++) {',
                    '\tSystem.out.println(i);',
                    '}'    
            ]
        },
        {
            id: 5, 
            type:'FOR_LOOP',
            length: 'MED',  
            data: ['for (int i = 0; i < rows; i++) {',
                    '\tfor (int j = 0; j < columns; j++) {',
                    '\t\tSystem.out.print("[" + i + "," + j + "] ");',
                    '\t}',
                    '}'
            ]
        },
        {
            id: 6, 
            type:'CONDITIONAL',
            length: 'MED',
            data: ['if (hours > 8) {',
                    '\treturn (rate * 8) + ((hours - 8) * (rate * 1.5));',
                    '}',
                    'else {',
                    '\treturn rate * hours;',
                    '}'
            ]  
        },
        {
            id: 7, 
            type:'FOR_LOOP',
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
            id: 8, 
            type:'WHILE_LOOP',
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
            id: 9, 
            type:'WHILE_LOOP',
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

module.exports = {getSnippetData}