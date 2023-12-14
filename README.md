# crystal-test

# Technology and Frameworks used as given: 
## Node JS
## Express JS
## MySQL

# Run project

## Create Accounts Table

CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB

### Make sure to add your database settings in db.js and email settings in emailService

## npm install
## node app.js

# Endpoints:

# Login with email and password
This endpoint will generate a Bearer token that must be used for authorization to call other end points excluding accounts/create
# POST: http://localhost:3000/login

# Accounts Endpoints
# POST: http://localhost:3000/accounts/create 
## (does not require token as need to first create account and then login to generate token)
# GET: http://localhost:3000/accounts
# GET: http://localhost:3000/accounts/:id
# PUT: http://localhost:3000/accounts/:id
# DELETE: http://localhost:3000/accounts/:id


