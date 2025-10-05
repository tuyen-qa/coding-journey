// src/callback-advanced-2.js
// ESM module. Focus on async flow control via callbacks.

//////////////////////////////////////////////////////////////
// 1. Parallel async callbacks
//////////////////////////////////////////////////////////////
export function runParallel(tasks, done) {
  // TODO:
  // - tasks: array of functions(cb)
  // - Gọi tất cả task, chỉ gọi done() khi tất cả xong
    let state = {
        finished: 0,
        total: tasks.length,
    }

    const onTaskDone = () => {
        state.finished++;
        if(state.finished === state.total) return done();
    }

    tasks.forEach(task => task(onTaskDone));
}

//////////////////////////////////////////////////////////////
// 2. Series async callbacks
//////////////////////////////////////////////////////////////
export function runSeries(tasks, done) {
  // TODO:
  // - Chạy tuần tự từng task, chỉ khi task trước callback xong mới chạy task sau
  // - Cuối cùng gọi done()
    let state = {
        index: 0,
        total: tasks.length,
    }

    const onTaskDone = () => {
        state.index++;
        if(state.index === state.total) return done();
        tasks[state.index](onTaskDone);
    }

    tasks[0](onTaskDone);
}

//////////////////////////////////////////////////////////////
// 3. Waterfall (truyền kết quả)
//////////////////////////////////////////////////////////////
export function waterfall(tasks, done) {
  // TODO:
  // - Mỗi task có dạng (prevResult, cb)
  // - Kết quả của task trước truyền cho task sau
  // - done(result cuối)
    let state = {
        index: 0,
        total: tasks.length,
    }

    const onTaskDone = (prevResult) => {
        state.index++;
        if(state.index === state.total) return done(prevResult);
        tasks[state.index](prevResult, onTaskDone);
    }
    tasks[0](null, onTaskDone);
}
