export default class Event {
    constructor() {
        this.listeners = [];
    }

    attach(listener) {
        if (typeof listener !== 'function') return;
        this.listeners.push(listener);
    }

    notify(...args) {
        for (let i = 0; i < this.listeners.length; i += 1) {
            this.listeners[i](...args);
        }
    }
}
