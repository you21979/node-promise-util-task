var Promise = require('bluebird');
var task = require('..');

var timeout = function(callback, ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(callback());
        }, ms);
    });
};

task.seq([
    function(){return 1},
    function(){return 2},
    function(){return 3},
    function(){return timeout(function(){return 4}, Math.random() * 1000)},
    function(){return 5},
    function(){return timeout(function(){return 6}, Math.random() * 1000)},
    function(){return 7}
]).then(console.log)

