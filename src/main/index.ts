import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let win: BrowserWindow | null;

function createWindow() {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 1096,
        defaultHeight: 760,
    });

    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.removeMenu();
    win.loadURL('http://127.0.0.1:3600');
    win.webContents.openDevTools();
    mainWindowState.manage(win);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
