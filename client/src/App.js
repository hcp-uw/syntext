import TextArea from './components/TextArea';

const App = () => {
  const example =  {
    id: 1,
    SnippetType:'FOR_LOOP',
    length: 'LONG',
    data: ['int j = 20;',
            'for (int i = 0; i < 10; i++) {',
            'System.out.print(j + “ - ” + i);',
            'if (i > j)',
            'System.out.println(“ < 0”)',
            'else',
            'System.out.println(“ > 0”)',
            'j -= 1;',
            '}'
        ]
}

  return (
    <div>
      <TextArea data={example.data}/>
    </div>
  );
}

export default App;