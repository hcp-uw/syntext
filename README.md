# syntext

## Setup for local development

In the root directory, run `docker-compose up --build -d`

Note that this will probably take a while to finish if this is your first time starting the app.

If this is your first time, you also need to initialize your local MySQL database container. Luckily, we have made this easy for you. Simply run `docker-compose run server npm run localDBinit`, and you should be good to go!

Any time you make changes, simply rerun `docker-compose up --build -d` to rebuild your containers.