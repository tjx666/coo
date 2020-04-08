import createElectronStorage from 'redux-persist-electron-storage';

import electronStore from './storage';

const persistStorage = createElectronStorage({ electronStore });

export default persistStorage;
