# Starting Containers

Navigate to syntext root directory and ensure docker-compose file exists.

Run `docker-compose up --build -d` to start the containers. This took my laptop ~200 seconds the first time. Afterwards, verify with `docker ps` that your containers are running. 

**server_container** should be running now. Enter a shell for this container by running `docker exec -it server_container /bin/sh`.  

Run the initialization script with `npm run localDBinit`. You should see a few confirmation messages. Push Ctrl-C to exit the process, and then type `exit` to leave the shell.

# MySQL Admin Tips

If you are getting an access denied error, double check that you are using the correct credentials in your .env file. Otherwise, create a new user by entering the **server_container** shell (run `docker exec -it server_container /bin/sh`), and run `node db-admin-scripts/create-user <user> <pw> <host>`. The values you provide should match the values in your .env file!

If this still doesn't work, you can manually log into MySQL by entering the **db_container** shell (run `docker exec -it db_container bash`) and logging into the root account (`mysql -u root -p`, followed by the password), and creating a new user by running the following:

`CREATE USER '<user>'@'<host>' IDENTIFIED BY '<pw>';`

`GRANT ALL PRIVILEGES ON *.* TO '<user>'@'<host>';`

Finally, verify that you added the user correctly by running the following query:

`SELECT User, Host FROM mysql.user;`

Which should show a list of users and hosts that are allowed to connect to our MySQL Server. Your new credentials should be in here!


Another error you might run into is that the syntext database hasn't been created. If this is the case, follow the above steps, but instead of creating a new user, create a new database like so:

`CREATE DATABASE syntext;`

And verify it worked by running the query

`SHOW DATABASES;`