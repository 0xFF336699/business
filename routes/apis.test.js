var app = require('../app');
var request = require('supertest');
describe('loading express', function () {
    this.timeout(10000);
    // it('user put /', function (done) {
    //     request(app)
    //         .put('/apis/user')
    //         .send({name: 'brother'})
    //         .end(function (err, res) {
    //             console.log('user put', err, res ? res.body : null);
    //             done();
    //         });
    // });
    it('business put/', function (done) {
        request(app)
            .put('/apis/business')
            .send({
                "key":8, // key +1 will be ok
                "manager":"admin",
                "title":"business",
                "users":[{"name":"manager", "name":"pitter"}]
            }).end(function (err, res) {
            console.log('business put', err, res ? res.body : null);
            done();
        })
    })
});