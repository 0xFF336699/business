var app = require('../app');
var request = require('supertest');
describe('loading express', function () {
    this.timeout(10000);
    // it('responds to /', function testSlash(done) {
    //     request(app)
    //         .get('/')
    //         .expect(200, done);
    // });
    it('user put /', function (done) {
        request(app)
            .put('/apis/user')
            .send({name: 'brother'})
            .end(function (err, res) {
                console.log('err res is ', err, res.body);
                done();
            });
    })
});