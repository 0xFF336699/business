const { Pool, Client } = require('pg');

const logs = require('../logs/index');
const pool = new Pool({
    user: 'bigbro',
    host: '39.107.15.62',
    database: 'ig',
    password: 'QKahef92WShQ2jlnYCc4oQ=',
    port: 8811,
});
const insert = 'insert';
const select = 'select';
const insertSingle = 'insertSingle';
const selectSingle = 'selectSingle';
function query(type, sql, values, alias, onComplete) {
    pool.query(sql, values, function (err, res) {
        let extra;
        let isOK = false;
       if(err){
           if(alias){
               logs.error(alias, err);
           }
       }else if(res){
           switch (type){
               case insertSingle:
                   isOK = res.rowCount == 1;
                   extra = res.rowCount;
                   break;
               case selectSingle:
                   isOK = res.rowCount == 1;
                   if(isOK){
                       extra = res.rows[0];
                   }
                   break;

           }
       }
       onComplete(err, res, extra, isOK);
    });
}
module.exports = {query, insert, insertSingle, select, selectSingle};

