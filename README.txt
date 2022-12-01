Requirements


1. Install dependencies using npm i
2. Create database with mysql with these configuration : {
    host : localhost
    user: USER_NAME
    password : DB_PASSWORD
    database : idqs
    table : users
    row : id ( with auto increament ), username , password
}
3. Create Temporary table with mysql with these configuration for register validation: {
    table : tempuser
    row : email VARCHAR (60) , validToken (100)
}
4. Create table coderepo {
    table: coderepo
    row : Code VARCHAR(255) , GUID VARCHAR(60)
}
5. set a expire date for env file (Token_Expire_Date)


API USAGE : 


    1 - Register a user :
    
        Method : POST
        Example : http://localhost:3000/UserRegister/register?username=SomeThing&password=SomeThing&email=SomeThing
    
