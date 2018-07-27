
var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://business:business@39.104.184.150:27017/business');


db.on('error', function(error) {
    console.log(error);
});

(function () {
    const tab = 'business';
    let s = new mongoose.Schema({
        key:{type:Number},
       title:{type:String},
        manager:{type:String},
        users:[{name:String, id:Number}]
    });
    let Model = db.model(tab, s);
    function save(d, callback) {
        let m = new Model(d);
        m.save((err) =>{
            callback(err);
        });
    }
    exports.business = {save};
})();