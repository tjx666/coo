import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

['popstate', 'pushstate', 'replacestate'].forEach(eventName => {
    window.addEventListener(eventName, event => {
        emitter.emit('urlChange', event);
    });
});

export default emitter;
