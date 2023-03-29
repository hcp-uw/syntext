# Directory Structure

| directory/file  | purpose |
|-----------------|-----------------------------|
|public           | contains express routes (endpoints) in their own modules to seperate some of the logic |
|src              | code that interacts directly with our DB for regular use (not initializing/setting up the DB) |
|src/Components   | code for all the components of our website and typing functionality |
|src/services     | code used for requesting code snippets from the backend using data that was grabbed from the website|
|documentation    | information, setup, and references for how the frontend works|
|node_modules     | all of the source code for external dependencies (as well as their dependencies and so on)|
|.gitignore       | a file that tells github what to ignore when you add/commit changes. simply add the path to the file you don't want to be tracked.|
|package.json     | contains information about our project, including dependencies and npm scripts|
|package-lock.json| mainly important for when there are issues with versions/deprecated libraries. in general, we don't need to touch this (let npm deal with it) |
