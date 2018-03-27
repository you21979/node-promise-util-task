const task = require('..');

const timeout = (callback, ms) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(callback());
        }, ms);
    });

const main = async () => {
    const tasklist = [
    ];
    for(let i = 0; i< 100000; ++i){
        tasklist.push(() => timeout(() => {console.log(i);return 1}, Math.random() * 10))
    }

    console.time("elapsed time - limit");
    const res = await task.limit(tasklist, 1000)
    console.timeEnd("elapsed time - limit");
}

main()
