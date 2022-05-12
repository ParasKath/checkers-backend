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

## API

##### Requests
1. To check server health

`GET /checkers/api/v1/monitor/ping`

Response: {
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": "PONG"
}

2. SignUp

`POST /checkers/api/v1/user/signUp`

RequestBody : 
{
    "email" : "tanukansal167@gmail.com",
    "password" : "HelloWorld"
}

Success Resp0nse : 
{
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": {
        "password": "SZPuhK8U4WXuwz9arZKg3CbxWv924AR12fd074b046c4e372ea16034d5c6d2b6b",
        "email": "tanukansal167@gmail.com",
        "_id": "6201b9c7079c8cab777cf294",
        "createdAt": "2022-02-08T00:31:03.456Z",
        "updatedAt": "2022-02-08T00:31:03.456Z",
        "__v": 0
    }
}

3. Login

`POST /checkers/api/v1/user/login`

RequestBody : 
{
    "email" : "tanukansal167@gmail.com",
    "password" : "HelloWorld"
}

Success Resp0nse : 
{
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": {
        "result": {
            "_id": "6201b9c7079c8cab777cf294",
            "email": "tanukansal167@gmail.com",
            "sessionToken": "BK55c9AZBDc9A",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRnB4UjhTazJ4WlEvbTh0OVFFYklnRTI2cGdLVW0vRW8xZENIUEUyazVkWnlnQzhtbFV3dDlGMUd5SFBRNXY0SEpsbHgzaWRjRTNPcmhkZ0F0SDM5QitzR1UvaVBCWUxlbkNPYkdldGl4SUFFUTA5MnZZREc1aDg5Q1UxcWZDcWNlU0ZGem1WWm00T25PVG45V3hucXZEdDU5c0o1MmExNkYrMmQrUUQxbHZiSXgrQ1BXQzJqdlBqNzV3ZDRiVENBIiwiaWF0IjoxNjQ0MjgwMzE5LCJleHAiOjE2NDQzNjY3MTl9.ThfGPnCb0t_lscBftygkuYUhlsC0q43MUVhiaYJTlnI"
        }
    }
}

4. Authorize

`POST /checkers/api/v1/security/authorize`

RequestHeaders : 
{
    "checkers-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRnB4UjhTazJ4WlEvbTh0OVFFYklnRTI2cGdLVW0vRW8xZENIUEUyazVkWnlnQzhtbFV3dDlGMUd5SFBRNXY0SEpsbHgzaWRjRTNPcmhkZ0F0SDM5QitzR1UvaVBCWUxlbkNPYkdldGl4SUFFUTA5MnZZREc1aDg5Q1UxcWZDcWNlU0ZGem1WWm00T25PVG45V3hucXZEdDU5c0o1MmExNkYrMmQrUUQxbHZiSXgrQ1BXQzJqdlBqNzV3ZDRiVENBIiwiaWF0IjoxNjQ0MjgwMzE5LCJleHAiOjE2NDQzNjY3MTl9.ThfGPnCb0t_lscBftygkuYUhlsC0q43MUVhiaYJTlnI",
}

Success Resp0nse : 
{
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": {
        "result": {
            "authorized": true,
            "userId": "6201b9c7079c8cab777cf294"
        }
    }
}


4. logout

`POST /checkers/api/v1/security/authorize`

RequestHeaders : 
{
    "checkers-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRnB4UjhTazJ4WlEvbTh0OVFFYklnRTI2cGdLVW0vRW8xZENIUEUyazVkWnlnQzhtbFV3dDlGMUd5SFBRNXY0SEpsbHgzaWRjRTNPcmhkZ0F0SDM5QitzR1UvaVBCWUxlbkNPYkdldGl4SUFFUTA5MnZZREc1aDg5Q1UxcWZDcWNlU0ZGem1WWm00T25PVG45V3hucXZEdDU5c0o1MmExNkYrMmQrUUQxbHZiSXgrQ1BXQzJqdlBqNzV3ZDRiVENBIiwiaWF0IjoxNjQ0MjgwMzE5LCJleHAiOjE2NDQzNjY3MTl9.ThfGPnCb0t_lscBftygkuYUhlsC0q43MUVhiaYJTlnI",
}

Success Resp0nse : 
{
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": {
        "result": "Logged Out Successfully."
    }
}

5. forgotPassword

`POST /checkers/api/v1/user/forgotPassword`

RequestHeaders : 
{
   
    "email" : "tanukansal167@gmail.com"
}

Success Resp0nse : 
{
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": {
        "result": "Reset password link has been sent to your registered email address. Valid for 5 minutes."
    }
}


6. resetPassword

`POST /checkers/api/v1/user/resetPassword`

RequestHeaders : 
{
    "verificationCode" : "3524",
    "password": "tanukansalhrhk"
}

Success Resp0nse : 
{
    "status": true,
    "statusCode": "success",
    "statusMessage": "Success",
    "responseCode": 200,
    "response": {
        "result": "Reset password link has been sent to your registered email address. Valid for 5 minutes."
    }
}


 
