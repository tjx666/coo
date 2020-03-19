import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

let previousUrl = window.location.href;
['popstate', 'pushstate', 'replacestate'].forEach(eventName => {
    window.addEventListener(eventName, () => {
        const url = window.location.href;
        if (url !== previousUrl) {
            previousUrl = url;
            emitter.emit('urlChange', {
                previousUrl,
                url,
            });
        }
    });
});
export default emitter;
