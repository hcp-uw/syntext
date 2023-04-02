# Directory Structure

| directory/file | purpose |
|-----------------|-----------------------------|
|controllers | contains express routes (endpoints) in their own modules to seperate some of the logic |
|db | code that interacts directly with our DB for regular use (not initializing/setting up the DB) |
|documentation | cool information and useful references|
|local-db-scripts | contains node scripts to set up your local MySQL database. This is only for development purposes, and you shouldn't have to run these files directly (`npm run localDBinit` does it for you!)|
|node_modules | all of the source code for external dependencies (as well as their dependencies and so on)|
|requests | contains requests that you can run in VSCode with the REST Client extension. feel free to make your own for testing/debugging!|
|utils | think of this as a tool box that lets us control the high-level details of our backend, like config, which lets us use env variables as an export, and middleware, which reduces code redundancy by extracting some common error handling and request/response processing into its own module |
|.env | All of the values that you either don't want to hard-code in case of future changes, or a place to put sensitive info (**make sure this is in .gitignore before putting anything secret in it**)|
|.gitignore | a file that tells github what to ignore when you add/commit changes. simply add the path to the file you don't want to be tracked.|
|app.js | file containing our actual express app's declaration and all the middleware it is currently using. |
|devserver.js | the server for front-end development. contains both app declaration and server/network config to make it easy to use and debug. We probably won't be building on this too much so don't worry about using it|
|package.json | contains information about our project, including dependencies and npm scripts|
|package-lock.json| mainly important for when there are issues with versions/deprecated libraries. in general, we don't need to touch this (let npm deal with it) |
|server.js | the file containing code to start the express server and application. note that the express app is instantiated in app.js, and then started in server.js|
