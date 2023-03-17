# Starting Containers

Navigate to syntext root directory and ensure docker-compose file exists.

Run `docker-compose up` to start containers. Afterwards, verify with `docker ps`.

**db_container** should be running now. Enter a bash shell for this container by running `docker exec -it db_container bash`.  

Start MySQL Command Line Client by running `mysql -u root -p`, followed by your password... `Password`.


## Entering MySQL CLI through local terminal (easy way)

Open a terminal on your local machine and run `docker exec -it db-container mysql -u root -p`, followed by your password.

Next, if you wish to use MySQL locally on your machine in development (you dont NEED to) then continue on to grant priveleges to your machine.

# Opening port to local machine (hard way)

## Find your IP address by trying to connect unsuccesfully 

On your local machine, run `mysql --host=127.0.0.1 --port=13306 -u root -p` and local IP will be displayed

Then, inside the MySQL CLI of the db_container, replacing *ip_address* with your actual IP, run the following MySQL commands:
`USE mysql;`
`CREATE USER 'root'@'ip_address' IDENTIFIED BY 'some_pass';`
`GRANT ALL PRIVILEGES ON *.* TO 'root'@'ip_address';`

You should now have connection priveleges, and will be able to use the MySQL CLI by running `mysql --host=127.0.0.1 --port=13306 -u root -p`.
