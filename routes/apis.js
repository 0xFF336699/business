const express = require('express');
const router = express.Router();
const pg = require('../postgres/index');
const logs = require('../logs/index');
const model = require('../domain/model');
const mongo = require('../mongo/index');
const ajv = require('../jsonschema/index');
const tabs = {
    user:'business_user',

}
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.put('/user', function (req, res) {
    const alias = 'user:put';
    let name = req.body.name;
    let admin = req.body.admin;
    console.log('body is', req.body);
    let sql = `INSERT INTO business_user
        (name)
    SELECT  $1
    WHERE
        NOT EXISTS (
            SELECT name FROM business_user WHERE name = $2
    )`;
    pg.query(pg.insertSingle, sql, [name, name], alias, onComplete);

    function onComplete(err, result, extra, isOK) {
        let data;
        if(err){
            data = {error:err};
            onError(alias, err);
        }else{
            data = {isOK:isOK};
        }
        // console.log('data is', err, extra, isOK);
        res.send(data);
    }
});

router.get('/users', function (req, res) {

});

const businessSchema = require('../jsonschema/business_put');
ajv.compile(businessSchema);
router.put('/business', function (req, res) {
    let b = req.body;
    let passed = ajv.validate(businessSchema, b);
    if(!passed){
        res.send({error:"schema error"});
        return;
    }
    isManager(b.manager)
    .then((res)=>{
        if(!res.isOK){
            throw new Error('no manager');
        }
        let doc = b;
        return saveBusiness(doc);
    }).catch((err) =>{
        onError('business:put', err);
        return err;
    }).then((r) =>{
        if(!r.isOK){
            throw r.err;
        }
        res.send({isOK:true})
    }).catch((err)=>{
        onError('business:put', err);
        res.send({err:err})
    });
});

function isManager(name) {
    let p = new Promise((resolve, reject)=>{
        const tab = tabs.user;
        let sql = `select id from ${tab} where name=$1`;
        pg.query(pg.selectSingle, sql, [name], 'isManager', (err, result, extra, isOK) =>{
            if(err){
                reject(err);
            }else{
                resolve({res:result, extra:extra, isOK:isOK});
            }
        });
    });
    return p;
}
function saveBusiness(doc) {
    let p = new Promise((resolve, reject)=>{
        mongo.business.save(doc, (err) =>{
            resolve({err:err, isOK:!err});
        });
    });
    return p;
}
function onError(alias, err) {
    // console.error(alias, err);
    logs.error(alias, err);
}
module.exports = router;