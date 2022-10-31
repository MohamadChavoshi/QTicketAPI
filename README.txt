Requirements


1. Install dependencies using npm i
2. Create database with mysql with these configuration : {
    host : localhost
    user: root
    password : mrezach.80
    database : idqs
    table : users
    row : id ( with auto increament ), username , password
}
3. Create Temporary database with mysql with these configuration for register validation: {
    table : tempuser
    row : email VARCHAR (60) , validToken (100)
} 