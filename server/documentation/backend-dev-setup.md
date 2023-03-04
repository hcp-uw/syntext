# Setting up your server directory

### Prerequisites
- Download MySQL and create a database named syntext
- Add REST Client as an extension (should be the first result)

### Setup Steps
Navigate inside of syntext (or whatever you named your root directory) and do the following

1. Inside of terminal, run `cd server` from the root directory. 

2. Run `npm install` to make sure you have all the required dependencies

3. Inside of the server directory, create a file named '.env' and add the following credentials:
    - PORT = 3001
    - MYSQL_HOST = 127.0.0.1
    - MYSQL_USER = root (or whatever you use)
    - MYSQL_PASSWORD = (your password for MySQL goes here)
    - MYSQL_DATABASE = syntext

4. Run `npm start`, and you should see the PORT specified in your .env file. If it says the server started on port undefined, make sure that you saved the file. If this doesn't work, try to run `npm i dotenv`

5. If you haven't already, make sure a local MySQL server is running on the specified host in your .env file. Run the following command to initialize and fill your local database: `npm run localDBinit` **This creates tables if they don't already exist, deletes all current entries, and fills your local DB with example data. Careful not to run unless you want to wipe your current database.** 

6. Test your database by clicking 'Send Request' inside of requests/getSnippet.rest (Note that you need the REST Client extension to do this). You should see something like this pop up in another tab

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 121
ETag: W/"79-ceyn/y1ubkhfFjpXk/s/3vrD82Q"
Date: Sun, 12 Feb 2023 05:02:45 GMT
Connection: close

{
  "id": 3,
  "type": "PRINT",
  "length": "SHORT",
  "data": [
    "int sum = myCat.length() - myGod.length();",
    "System.out.println(sum);"
  ]
}
```

### Your development enviornment is all set up! 