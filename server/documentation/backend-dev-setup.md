### Setup

create **.env** file and put it in root directory 

run `docker-compose up --build -d` in the root directory.

If it is you first time running syntext, you need to initialize and fill your local database. Do this by running `docker-compose run server npm run localDBinit`

To test any changes you make to the backend, write tests using *jest.js* and include them in **./server/tests**. Then, simply run `npm test` inside of **server** or **client**.