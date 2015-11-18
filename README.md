# node-promise-util-task

## task.seq(tasklist)

sequentially processing

```:seq.js
var Promise = require('bluebird');
var task = require('promise-util-task');

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

console.time("elapsed time - seq");
task.seq(tasklist).then(function(res){
    console.timeEnd("elapsed time - seq");
    console.log(res);
})
```

```:result
elapsed time - seq: 10033ms
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

## task.all(tasklist)

parallel processing

```:all.js
var Promise = require('bluebird');
var task = require('promise-util-task');

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
```

```:result
elapsed time - all: 1007ms
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

## task.limit(tasklist, limit_count)

limited parallel processing

```:limit.js
var Promise = require('bluebird');
var task = require('promise-util-task');

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

console.time("elapsed time - limit");
task.limit(tasklist, 5).then(function(res){
    console.timeEnd("elapsed time - limit");
    console.log(res);
})
```

```:result
elapsed time - limit: 2009ms
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

