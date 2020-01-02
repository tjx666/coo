"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
let win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadURL('http://127.0.0.1:3600');
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map