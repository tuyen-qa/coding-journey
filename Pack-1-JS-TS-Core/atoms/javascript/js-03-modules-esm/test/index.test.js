// TODO: default import
import square from '../src/math.js';
console.log("Square(3):", square(3));

// TODO: named import
import { add, subtract } from '../src/math.js';
console.log("Add(2,3):", add(2,3));

// TODO: alias import
import { reverseString as rev } from '../src/string.js';
console.log("Reverse('hello'):", rev("hello"));

// TODO: default + named import
import slugify, { capitalize } from '../src/string.js';
console.log("Slugify('Hello World'):", slugify("Hello World"));

// TODO: import tất cả vào object
import * as MathUtils from '../src/math.js';
console.log("MathUtils.multiply(2,4):", MathUtils.multiply(2,4));

// TODO: import default + named
import DEFAULT_CONSTANT, { PI, APP_NAME } from '../src/constants.js';
console.log("Default constant:", DEFAULT_CONSTANT);

// TODO: import từ re-export
import hello, { Constants } from '../src/index.js';
hello();
console.log("Constants.APP_NAME:", Constants.APP_NAME);

// TODO: side-effect import
import '../src/constants.js';

// TODO: dynamic import
const runDynamic = async () => {
    const mod = await import('../src/math.js');
    console.log("Dynamic import add(7,8):", mod.add(7,8));
};
runDynamic();
