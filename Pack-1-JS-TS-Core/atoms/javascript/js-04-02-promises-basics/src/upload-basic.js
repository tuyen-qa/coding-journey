// src/upload-basic.js
// ESM module. Fill TODOs. Promise + .then/.catch only.

// 1) Simulated upload
export function uploadFile(name, sizeKb) {
  // TODO:
  // - Return Promise that resolves after ~40ms with { name, sizeKb, status:'uploaded' }
}

// 2) Compress then upload (chain)
export function compressFile(name, sizeKb) {
  // TODO:
  // - Return Promise that resolves to { name, sizeKb: Math.floor(sizeKb/2), status:'compressed' }
}

export function compressThenUpload(name, sizeKb) {
  // TODO:
  // - Chain: compressFile -> uploadFile, return final uploaded object
}

// 3) Upload many (parallel)
export function uploadMany(files /* array of {name,sizeKb} */) {
  // TODO:
  // - Use Promise.all over files mapping to uploadFile
  // - Resolve to an array of uploaded results
}

// 4) Race: slow upload vs timeout
export function uploadSlow(name, sizeKb) {
  // TODO:
  // - Like uploadFile but ~70ms delay
}

export function timeout(ms) {
  // TODO:
  // - Reject after ms with 'Timeout!'
}

export function uploadWithTimeout(name, sizeKb) {
  // TODO:
  // - Race uploadSlow with timeout(30)
}
