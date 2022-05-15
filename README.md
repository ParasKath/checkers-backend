## checkers Service
This service provides the User Managemant, Session Management( Login , Logout ) and authentication services via using session and jwt token.
It is a well-architectured application, formed keeping the vision of a big application.

This microservices connects with mongo database, to keep the storage.

## Postman Collection Link
https://www.getpostman.com/collections/218e65c465d78d602178

## Steps to run:
1. npm install
2. Make file ".env" and copy contents of "example.env" in it.
2. npm run start

## Tech And Resources
This Microservice uses:
- [Javascript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/en/docs/)
- [MongoDB](https://www.mongodb.com/)

## Modules
Follow MVC Design Pattern
Implemented central error handling
Implemented secured database connection
Implemented Security
Implemeted central logger
Implemented Session Maintainance( for login/logout, can further use for other session specific tasks)


## Installation

Create an `.env` with the help of `example.env`. All the required environment variables are set there.  

This service works on Node.js

`.env.example` is given in the respository.

Install the libraries and dependencies and start the server.

```sh
npm install
npm run start
```

The default Port is `3333` you can change it `.env`.
The default Host is `0.0.0.0`, can be set in `.env`




 
