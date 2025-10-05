// src/callback-problem-1.js
// Problem solving with callback-based traversal.

export function traverseTree(node, callback) {
  // TODO:
  // - Call callback(node.value)
  // - If node.children, traverse recursively
    callback(node.value);
    if(node.children) {
        node.children.forEach(child => traverseTree(child, callback));
    }
}

export function findInTree(node, predicate) {
  // TODO:
  // - Return the first node whose value satisfies predicate(node.value)
  // - Return null if not found
    if(predicate(node.value)) {
        return node;
    }

    if (node.children) {
        for (const child of node.children) {
            const found = findInTree(child, predicate);
            if (found) return found;
        }
    }

    return null
}

export function countNodes(node, predicate) {
  // TODO:
  // - Count nodes where predicate(value) === true
    let count = predicate(node.value) ? 1 : 0

    if (node.children) {
        node.children.forEach(child => {
            count += countNodes(child, predicate);
        });
    }
    return count;
}
