// src/callback-advanced-3.js
// Build a mini EventEmitter.

export class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    // TODO: đăng ký callback. 1 event có thể có nhiều callbacks, chọn cấu trúc phù hợp
    this.events[event] = [];
    this.events[event].push(callback);
  }
  emit(event, data) {
    // TODO: gọi tất cả callback tương ứng
    const callbacks = this.events[event];
    callbacks.forEach(cb => cb(data));
  }
  off(event, callback) {
    // TODO: gỡ bỏ 1 callback cụ thể
    const callbacks = this.events[event];
    if (!callbacks) return;
    this.events[event] = callbacks.filter(cb => cb !== callback);
  }
}
