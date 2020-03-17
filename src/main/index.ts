import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import debug from 'electron-debug';
import installExtension, {
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
debug();
// app.commandLine.appendSwitch('proxy-server', '127.0.0.1:12121');

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
    win.loadURL('http://127.0.0.1:3000');
    mainWindowState.manage(win);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', () => {
    createWindow();
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
        .then(name => console.log(`Added Extension:  ${name}`))
        .catch(error => console.log('An error occurred:', error));
});

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
