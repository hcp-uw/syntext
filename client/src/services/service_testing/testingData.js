const snippets = [
  {
    id: 1,
    type: 'PRINT',
    length: 'SHORT',
    data: ['System.out.println("goodbye world");']
  },
  {
    id: 2,
    type: 'PRINT',
    length: 'SHORT',
    data: ['String myCat = "Matilda";', 'System.out.println(myCat.charAt(3));']
  }
]

const users = [
  {
    username: 'test1',
    password: 'test1',
    userID: undefined,
    token: undefined
  },
  {
    username: 'test2',
    password: 'test2',
    userID: undefined,
    token: undefined
  }
]

const games = [
  {
    userID: undefined,
    snippet_id: 1,
    total_time: 30,
    total_characters: 45,
    wpm_data: [99, 100, 101],
    wpm_avg: 100,
    accuracy: 88,
    num_mistakes: 5
  },

  {
    userID: undefined,
    snippet_id: 2,
    total_time: 20,
    total_characters: 45,
    wpm_data: [99, 10, 1],
    wpm_avg: 10,
    accuracy: 8,
    num_mistakes: 500
  }
]

export { snippets, users, games }
