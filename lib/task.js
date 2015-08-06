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


