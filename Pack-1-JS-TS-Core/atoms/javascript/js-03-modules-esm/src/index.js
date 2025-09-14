// TODO: re-export cụ thể
export { add, subtract } from './math.js';

// TODO: re-export tất cả
export * from './string.js';

// TODO: re-export tất cả với namespace
export * as Constants from './constants.js';

// TODO: default export
export default function hello() {
    console.log("Hello from index.js");
}
