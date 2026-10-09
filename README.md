Library API

Description
This project is a REST API for library. Built using Node.js, Express, MongoDB, Mongoose, and dotenv.
This project allows user to manager author, book, and members. It also allows to borrow and return.

Technology
Node.js
Express.js
MongoDB Atlas
Mongoose
dotenv
Postman for testing

1. How Authentication works?
We've used JWT with bearer token authentication to our API to verify users.
When the user is registered with Username and password and the password is hashed using bcryptjs and stored in DB.
When the user logged in with his credentials it generated JWT. We used that JWT in authorization header in Bearer token.
In middleware it authenticates and verifies the token before allowing access to protected routes.

2. Which routes are protected?
Method          Endpoint            Access
GET         /api/books              Public
GET         /api/books/:id          Public
POST        /api/books              Protected(User must login)
PUT         /api/books/:id          Protected(User must login and owner can only change)
POST        /api/books              Protected(User must login and owner can only change)
DELETE      /api/books/:id          Protected(User must login and owner can only change)
POST        /api/

3. How does authorization works?
In our API we uses JWT authentication with Bearer Tokens. When user login the server generate JWT. Then that JWT token will be sent in authorization header to access protected routes.
auth.js will verify the token and identify the user logged in.
authorizeBook.js middleware checks if the belongs to the user logged in or not before allowing into protected routes and do anything.
401 - Unauthenticated: Request has no authorization token which we already tested.
403 - Unauthorized: The user doesn't have access to change anything.
404 - Not found: Book didn't found.

4. How to run program? 

Installation process
Open the project folder in CMD
Install packages
npm install
Create .env file and add MongoDB connection URL and JWT_SECRET.

How to run this API
Start server using "node server.js"
Now server runs at 
http://localhost:3000

Register the user and login in, after logging in copy the JWT token and paste in the header authorization in Bearer token while testing the protected routes.

