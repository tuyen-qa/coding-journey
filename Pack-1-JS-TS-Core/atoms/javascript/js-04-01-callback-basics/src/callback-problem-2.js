// src/callback-problem-2.js
// Simulate async operations with callback.

export function simulateAPI(successRate, callback) {
  // TODO:
  // - After 20ms, call callback(null, 'OK') with successRate% chance.
  // - Otherwise, call callback('Error', null).
    setTimeout(()=>{
        const random = Math.random()*100;
        if (random < successRate) {
            callback(null, 'OK');
        } else {
            callback('Error', null)
        }
    }, 20)
}

export function retry(apiFn, attempts, done) {
    // TODO:
    // - Call apiFn(cb)
    // - If error, retry until attempts exhausted
    // - Finally call done(err, result)
    const onTaskDone = (err, res) => {
        if(!err) return done(null, res);
        attempts--
        if (attempts > 0) {
            apiFn(onTaskDone);
        } else {
            return done(err, null);
        }
    }
    apiFn(onTaskDone);
}

export function queue(tasks, done) {
  // TODO:
  // - Execute task(cb) functions sequentially.
  // - Call done() after all are complete.
    let index = 0;
    let total = tasks.length;

    const onTaskDone = () => {
        index += 1;
        if(index === total) return done();
        tasks[index](onTaskDone);
    }
    if (total === 0) return done();
    tasks[0](onTaskDone);
}
