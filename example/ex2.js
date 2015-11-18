var Promise = require('bluebird');
var task = require('..');

var timeout = function(callback, ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(callback());
        }, ms);
    });
};

var tasklist = [
    function(){return timeout(function(){return 1}, Math.random() + 1000)},
    function(){return timeout(function(){return 2}, Math.random() + 1000)},
    function(){return timeout(function(){return 3}, Math.random() + 1000)},
    function(){return timeout(function(){return 4}, Math.random() + 1000)},
    function(){return timeout(function(){return 5}, Math.random() + 1000)},
    function(){return timeout(function(){return 6}, Math.random() + 1000)},
    function(){return timeout(function(){return 7}, Math.random() + 1000)},
    function(){return timeout(function(){return 8}, Math.random() + 1000)},
    function(){return timeout(function(){return 9}, Math.random() + 1000)},
    function(){return timeout(function(){return 10}, Math.random() + 1000)}
];

console.time("elapsed time - all");
task.all(tasklist).then(function(res){
    console.timeEnd("elapsed time - all");
    console.log(res);
})

console.time("elapsed time - seq");
task.seq(tasklist).then(function(res){
    console.timeEnd("elapsed time - seq");
    console.log(res);
})

console.time("elapsed time - limit");
task.limit(tasklist, 5).then(function(res){
    console.timeEnd("elapsed time - limit");
    console.log(res);
})

