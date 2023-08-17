const { app, BrowserWindow, BrowserView } = require('electron');

const windowConfig = {
    width: 2000,
    height: 1200,
    webPreferences: { nodeIntegration: true }
};

const sites = [
    'https://twitter.com/i/lists/168108242',
    'https://twitter.com/i/lists/132220062',
    'https://twitter.com/i/lists/1060242355968770048',
    'https://twitter.com/i/lists/1571131868820512769',
    'https://twitter.com/notifications'
];

const columnConfig = {
    offset: 85,
    buffer: 15,
    extraWidth: 30
};

function createMainView() {
    const mainWindow = new BrowserWindow(windowConfig);
    const baseViewWidth = mainWindow.getBounds().width / sites.length;
    const actualViewWidth = baseViewWidth + columnConfig.extraWidth;

    sites.forEach((site, index) => {
        const view = new BrowserView();
        mainWindow.addBrowserView(view);
        
        const xPosition = (actualViewWidth - columnConfig.extraWidth) * index - columnConfig.offset * index + columnConfig.buffer * index;
        
        view.setBounds({
            x: xPosition,
            y: 0,
            width: actualViewWidth + columnConfig.offset - columnConfig.buffer,
            height: mainWindow.getBounds().height
        });
        
        view.webContents.loadURL(site);
        view.webContents.on('did-finish-load', () => {
            view.webContents.executeJavaScript(`document.body.style.transform = 'translateX(-${columnConfig.offset}px)';`);
        });
    });

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createMainView);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', createMainView);
