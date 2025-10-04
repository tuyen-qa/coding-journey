// src/upload-basic.js
// ESM module. Fill TODOs. Promise + .then/.catch only.

// 1) Simulated upload
export function uploadFile(name, sizeKb) {
  // TODO:
  // - Return Promise that resolves after ~40ms with { name, sizeKb, status:'uploaded' }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({name, sizeKb, status: 'uploaded'}), 40)
    })
}

// 2) Compress then upload (chain)
export function compressFile(name, sizeKb) {
  // TODO:
  // - Return Promise that resolves to { name, sizeKb: Math.floor(sizeKb/2), status:'compressed' }
    return Promise.resolve({name, sizeKb: Math.floor(sizeKb/2), status: 'compressed'})
        .then(file => uploadFile(file.name, file.sizeKb))
}

export function compressThenUpload(name, sizeKb) {
  // TODO:
  // - Chain: compressFile -> uploadFile, return final uploaded object
    return compressFile(name, sizeKb)
    .then(file => uploadFile(file.name, file.sizeKb))
}

// 3) Upload many (parallel)
export function uploadMany(files /* array of {name,sizeKb} */) {
  // TODO:
  // - Use Promise.all over files mapping to uploadFile
  // - Resolve to an array of uploaded results
    return Promise.all(
        files.map(file => uploadFile(file.name, file.sizeKb))
    )
}

// 4) Race: slow upload vs timeout
export function uploadSlow(name, sizeKb) {
  // TODO:
  // - Like uploadFile but ~70ms delay
    return new Promise(resolve => {
        setTimeout(() => resolve({name, sizeKb, status: 'uploaded'}), 70);
    })
}

export function timeout(ms) {
  // TODO:
  // - Reject after ms with 'Timeout!'
    return new Promise((_, reject) => {
        setTimeout(() => reject('Timeout!'), ms);
    })
}

export function uploadWithTimeout(name, sizeKb) {
  // TODO:
  // - Race uploadSlow with timeout(30)
    return Promise.race([
        timeout(30),
        uploadSlow(name,sizeKb)
    ])
}
