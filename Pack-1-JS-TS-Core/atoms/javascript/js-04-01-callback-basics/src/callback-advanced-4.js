// src/callback-advanced-4.js
// Build simple middleware chain executor.

export class App {
  constructor() {
    this.middlewares = [];
  }
  use(fn) {
    // TODO: thêm fn vào danh sách
    this.middlewares.push(fn);
  }
  run(req, res) {
    // TODO:
    // - chạy từng middleware(req, res, next)
    // - gọi next() để chuyển qua middleware kế tiếp
    const middleWaresArr = this.middlewares
    let index = 0;
    const total = middleWaresArr.length;

    const onMiddleWareDone = () => {
      index++
      if(index === total) return
      middleWaresArr[index](req, res, onMiddleWareDone);
    }

    if (total === 0) return
    middleWaresArr[0](req, res, onMiddleWareDone);
  }
}
