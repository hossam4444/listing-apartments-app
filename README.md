# listing-apartments-app
simple listing apartments app that allow the user to see more details about each apartment.

## how to run 
clone the project to your lockal machine 

for production env execute  
docker compose up --build -d

for development env execute  
docker compose -f docker-compose-dev.yml up --build

now you have two containers 
- the db running at  0.0.0.0:3306->3306/tcp
- the api running at 0.0.0.0:3000->3000/tcp

## if added any pakages 
docker compose down --volumes
docker compose up --build
