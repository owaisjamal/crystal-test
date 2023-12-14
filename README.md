# crystal-test

First need to run
## npm install

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


