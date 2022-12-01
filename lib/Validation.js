// const { default: knex } = require('knex');
require('../lib/database');

function TokenGenerate(){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = ""
    var chaactersLength = characters.length;
    for ( var i = 0; i < 100 ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }
    return result;
}


//This function will validate if the email is one of the regular emails such as Gmail, Yahoo, or Outlook

function checkEmail(email) {

    var filter1 = /^[A-Za-z0-9._%+-]+@gmail.com$/;
    var filter2 = /^[A-Za-z0-9._%+-]+@yahoo.com$/;
    var filter3 = /^[A-Za-z0-9._%+-]+@outlook.com$/;

    if (email.match(filter1) || email.match(filter2) || email.match(filter3)) {
    return true;
    }
    else {
     return false;
    }
}


module.exports = {TokenGenerate, checkEmail}