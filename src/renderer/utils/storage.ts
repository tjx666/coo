import Store from 'electron-store';

const storage = new Store({
    cwd: process.env.NODE_ENV === 'development' ? process.cwd() : undefined,
    name: 'storage',
});

export default storage;
