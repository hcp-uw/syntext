# Purpose

Right now, we essentially just need to get code snippets from our database. Although there is a bunch of code, the actual functionality of our backend is very simple 


# API 

*note: Snippet refers to the definition in db/snippet_data_model.txt*

| URL | params/body | response | 
|---------------------|------------|------|
|/api/read/getsnippet?id=`id` |`id (int)` | Snippet | 
|/api/edit/mksnippet | `body (Snippet)` | status code | 
|/api/edit/delsnippet?id=`id` | `id (int)` | status code | 





# Database 

We are using the [mysql2](https://www.npmjs.com/package/mysql2#first-query) node module to interact with our database. 

We have 3 main functions (all in db.js) to interact with our database, but more will soon come!

- `getSnippetByID(id) `
    - should be used in controllers/readSnippets.js
    - takes in an `int id`, returns a `Promise`
    - use `.then(data => {...})` to get the data from MySQL
    - data is returned in an unprocessed array of snippet lines. Ex:
    ```
    'data': [
        {
        id: 3,
        snippet_type: 'PRINT',
        snippet_length: 'SHORT',
        line_index: 0,
        line_text: 'int sum = myCat.length() - myGod.length();'
        },
        {
        id: 3,
        snippet_type: 'PRINT',
        snippet_length: 'SHORT',
        line_index: 1,
        line_text: 'System.out.println(sum);'
        }
    ]
    ```
- `createSnippet(snippet)`
    - should be used in controllers/editSnippets.js
    - takes in a snippet as is defined in bd/snippet_data_model.txt
    - returns an object `{outcome, created}`, or an error
    - creates entry in both snippet_records and snippet_data

- `deleteSnippetByID(id)`
    - should be used in controllers/editSnippets.js
    - takes in an `int id` and returns an object `{outcome, deleted}`, or an error
    - deletes snippet from both snippet_records and snippet_data


These functions are used to extract out the logic and data processing that goes into inserting, retrieving, and deleting snippets from out database. They are used in defining API endpoints inside of the corresponding controllers/Routers

