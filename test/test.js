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
    it('seq error catch1', function(done) {
        task.seq([f(0),f(1),f(2),f(3)]).then(function(res){
            throw new Error("test");
            done(new Error("error cache fail"));
        }).catch(function(e){
            done();
        })
    });
    it('seq error catch2', function(done) {
        task.seq([f(0),function(){ throw new Error("test") },f(2),f(3)]).then(function(res){
            done(new Error("error cache fail"));
        }).catch(function(e){
            done();
        })
    });
    it('all', function(done) {
        task.all([f(0),f(1),f(2),f(3)]).then(function(res){
            assert(res[0] === 0)
            assert(res[1] === 1)
            assert(res[2] === 2)
            assert(res[3] === 3)
            done();
        }).catch(function(e){
            done(e);
        })
    });
    it('all error catch1', function(done) {
        task.all([f(0),f(1),f(2),f(3)]).then(function(res){
            throw new Error("test");
            done(new Error("error cache fail"));
        }).catch(function(e){
            done();
        })
    });
    it('all error catch2', function(done) {
        task.all([f(0),function(){ throw new Error("test") },f(2),f(3)]).then(function(res){
            done(new Error("error cache fail"));
        }).catch(function(e){
            done();
        })
    });
    it('limit', function(done) {
        task.limit([f(0),f(1),f(2),f(3)], 10).then(function(res){
            assert(res[0] === 0)
            assert(res[1] === 1)
            assert(res[2] === 2)
            assert(res[3] === 3)
            done();
        }).catch(function(e){
            done(e);
        })
    });
    it('limit error catch1', function(done) {
        task.limit([f(0),f(1),f(2),f(3)], 10).then(function(res){
            throw new Error("test");
            done(new Error("error cache fail"));
        }).catch(function(e){
            done();
        })
    });
    it('limit error catch2', function(done) {
        task.limit([f(0),function(){ throw new Error("test") },f(2),f(3)], 10).then(function(res){
            done(new Error("error cache fail"));
        }).catch(function(e){
            done();
        })
    });
});
