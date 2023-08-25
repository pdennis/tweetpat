const { app, BrowserWindow, BrowserView } = require('electron');

const windowConfig = {
    width: 2560,
    height: 1600,
    webPreferences: { nodeIntegration: true }
};

const sites = [
    'https://twitter.com/notifications',
    'https://twitter.com/i/lists/168108242',
    'https://twitter.com/i/lists/132220062',
    'https://twitter.com/i/lists/1060242355968770048',
    'https://twitter.com/i/lists/1571131868820512769',
    'https://indieweb.social/lists/646',
    'https://indieweb.social/lists/645',
    'https://indieweb.social/lists/776',
];

const columnConfig = {
    offset: 60,
    buffer: 10,
    extraWidth: 0,
    scaleFactor: 0.8 // downscale to 80% of original size
};

let mainWindow;  // This is declared outside so we can check if it's already created.

function createMainView() {
    if (mainWindow) return;  // If mainWindow already exists, don't create a new one.

    mainWindow = new BrowserWindow(windowConfig);
    const baseViewWidth = mainWindow.getBounds().width / sites.length;
    const actualViewWidth = baseViewWidth + columnConfig.extraWidth + 100;
    mainWindow.loadFile('index.html');

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
            if (index !== 0) { // Only apply the transformation if it's not the leftmost column
                view.webContents.executeJavaScript(`
                    document.body.style.transform = 'translateX(-${columnConfig.offset}px) scale(${columnConfig.scaleFactor})';
                `);
            } else {
                // Apply just the scaling for the leftmost column
                view.webContents.executeJavaScript(`
                    document.body.style.transform = 'scale(${columnConfig.scaleFactor})';
            `);
        }
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

