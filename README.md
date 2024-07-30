# listing-apartments-app
simple listing apartments app
using __Node.js with Express (TypeScript), MySQL, and Next.js, all containerized using Docker Compose__ to run everything using one command.

## how to run 
1- clone the project to your lockal machine 

2- __production__ or __development__ environment!
  - **for production env execute**   
  ```docker compose up --build -d```

  - **for development env execute**  
  ```docker compose -f docker-compose-dev.yml up --build```

now you have two containers 
- the db running at  0.0.0.0:3306->3306/tcp
- the api running at 0.0.0.0:3000->3000/tcp

## if added any pakages 
```docker compose down --volumes && docker compose up --build```
