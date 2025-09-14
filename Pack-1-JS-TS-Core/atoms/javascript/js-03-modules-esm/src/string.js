// TODO: named export
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// TODO: export alias
function reverse(str) {
    return str.split('').reverse().join('');
}
export {reverse as reverseString };
// TODO: default export
export default function slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '-');
}
