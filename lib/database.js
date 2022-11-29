require("dotenv").config();

const knex = require("knex")({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
    },
    pool: {min: 0, max: 7},
});

knex.raw("SELECT VERSION()").then(() => {
    console.log(`[+] connection to db successful ...`);
});

module.exports = knex;