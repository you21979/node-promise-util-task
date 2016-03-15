var assert = require('assert');
var task = require('..');
describe('util-task', function() {
    var f = function(x){ return function(){ return x } }
    it('sequence', function(done) {
        task.seq([f(0),f(1),f(2),f(3)]).then(function(res){
            assert(res[0] === 0)
            assert(res[1] === 1)
            assert(res[2] === 2)
            assert(res[3] === 3)
            done();
        }).catch(function(e){
            done(e);
        })
    });
});
