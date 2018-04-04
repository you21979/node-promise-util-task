# promise-util-task

[![NPM](https://nodei.co/npm/promise-util-task.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/promise-util-task)  
[![Build Status](https://secure.travis-ci.org/you21979/node-promise-util-task.png?branch=master)](https://travis-ci.org/you21979/node-promise-util-task)
[![Coverage Status](https://coveralls.io/repos/github/you21979/node-promise-util-task/badge.svg?branch=master)](https://coveralls.io/github/you21979/node-promise-util-task?branch=master)

## install

```
npm i promise-util-task
```

## task.seq(tasklist)

sequentially processing

```:seq.js
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

## typescript sample

```:seq.ts
import * as put from 'promise-util-task'
import * as psleep from '@you21979/promise-sleep'

const list = [
    () => psleep(Math.random() + 1000, 1),
    () => psleep(Math.random() + 1000, 2),
    () => psleep(Math.random() + 1000, 3),
    () => psleep(Math.random() + 1000, 4),
    () => psleep(Math.random() + 1000, 5),
    () => psleep(Math.random() + 1000, 6),
    () => psleep(Math.random() + 1000, 7),
    () => psleep(Math.random() + 1000, 8),
    () => psleep(Math.random() + 1000, 9),
    () => psleep(Math.random() + 1000, 10)
]

console.time("elapsed time - seq");
put.seq(list).then((res) => {
    console.timeEnd("elapsed time - seq");
    console.log(res)
})
```



# compatible note

## 0.1.0

### Promise

This module removed bluebird from version 0.1.0

### TypeScript support

rewrite typescript.



