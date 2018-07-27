
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
var mongooseSchema = new mongoose.Schema({
    username : {type : String, default : '匿名用户'},
    title    : {type : String},
    content  : {type : String},
    time     : {type : Date, default: Date.now},
    age      : {type : Number}
});


// 添加 mongoose 实例方法
mongooseSchema.methods.findbyusername = function(username, callback) {
    return this.model('mongoose').find({username: username}, callback);
}
// 添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({title: title}, callback);
}

// model
var mongooseModel = db.model('mongoose', mongooseSchema);

// 增加记录 基于 entity 操作
var doc = {username : 'emtity_demo_username', title : 'emtity_demo_title', content : 'emtity_demo_content'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('saved OK!');
    }
    // 关闭数据库链接
    // db.close();
});



