var Promise = require('bluebird');

var seq = exports.seq = function(promises){
    var results = [];
    var pushResult = Array.prototype.push.bind(results);
    return promises.reduce(function (prevPromise, promisedIdentity){
        return prevPromise.then(function (){
            return Promise.resolve(promisedIdentity()).then(pushResult);
        });
    }, Promise.resolve()).then(function (){
        return results;
    });
}

var all = exports.all = function(promises){
    return Promise.all(promises.map(function(v){ return v() }));
}

var limit = exports.limit = function(promises, max){
    var w = [];
    for(i=0; i<max; ++i) w.push([]);
    promises.forEach(function(promise, n){
        w[n % max].push(promise);
    })
    var seqs = w.map(function(v){
        return function(){
            return seq(v)
        }
    })
    return all(seqs).then(function(res){
        var w = new Array(res.reduce(function(r,v){return r+v.length},0));
        var len = res.length;
        for(i = 0; i<len; ++i){
            for(j=0; j<res[i].length; ++j){
                w[i + (j * len)] = res[i][j];
            }
        }
        return w;
    })
}

