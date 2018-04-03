import * as assert from 'assert'
import * as task from '../lib/task'

type callback = (Error?) => void

describe('util-task', () => {
    const f = (x) => () => { return x }
    it('sequence', (done : callback) => {
        task.seq([f(0),f(1),f(2),f(3)]).then((res) => {
            assert(res[0] === 0)
            assert(res[1] === 1)
            assert(res[2] === 2)
            assert(res[3] === 3)
            done();
        }).catch((e) => {
            done(e);
        })
    });
    it('seq error catch1', (done : callback) => {
        task.seq([f(0),f(1),f(2),f(3)]).then((res) => {
            throw new Error('test 1')
        }).catch((e) => {
            done();
        })
    });
    it('seq error catch2', (done : callback) => {
        task.seq([f(0),() => { throw new Error("test") },f(2),f(3)]).then((res) => {
            done(new Error("error cache fail"));
        }).catch((e) => {
            done();
        })
    });
    it('all', (done : callback) => {
        task.all([f(0),f(1),f(2),f(3)]).then((res) => {
            assert(res[0] === 0)
            assert(res[1] === 1)
            assert(res[2] === 2)
            assert(res[3] === 3)
            done();
        }).catch((e) => {
            done(e);
        })
    });
    it('all error catch1', (done : callback) => {
        task.all([f(0),f(1),f(2),f(3)]).then((res) => {
            throw new Error('test 1')
        }).catch((e) => {
            done();
        })
    });
    it('all error catch2', (done : callback) => {
        task.all([f(0),() => { throw new Error("test") },f(2),f(3)]).then((res) => {
            done(new Error("error cache fail"));
        }).catch((e) => {
            done();
        })
    });
    it('limit', (done : callback) => {
        task.limit([f(0),f(1),f(2),f(3)], 10).then((res) => {
            assert(res[0] === 0)
            assert(res[1] === 1)
            assert(res[2] === 2)
            assert(res[3] === 3)
            done();
        }).catch((e) => {
            done(e);
        })
    });
    it('limit error catch1', (done : callback) => {
        task.limit([f(0),f(1),f(2),f(3)], 10).then((res) => {
            throw new Error('test 1')
        }).catch((e) => {
            done();
        })
    });
    it('limit error catch2', (done) => {
        task.limit([f(0),() => { throw new Error("test") },f(2),f(3)], 10).then((res) => {
            done(new Error("error cache fail"));
        }).catch((e) => {
            done();
        })
    });
});
