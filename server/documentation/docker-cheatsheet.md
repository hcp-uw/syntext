# Docker Cheat Sheet

|command|purpose|
|--------------------------|----------------------------|
|`docker-compose up --build -d`| Run in the root dir (same dir as docker-compose.yml). Builds the images and starts containers |
|`docker-compose down` | stops all the running composed containers|
|`docker ps`| Shows all running containers |
|`docker exec -it <container_name> <entry_point>`| enter interactive shell for given container. (entrypoints... server: /bin/sh, db: bash)|
