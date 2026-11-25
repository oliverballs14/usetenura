const { app, BrowserWindow, shell, Menu } = require('electron');
const URL_START = 'https://usetenura.com/demo/';
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 900, minHeight: 600,
    backgroundColor: '#080c0a', title: 'Tenura', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  win.loadURL(URL_START);
  // links to other sites open in the normal browser
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('https://usetenura.com/')) { e.preventDefault(); shell.openExternal(url); }
  });
  win.webContents.on('did-fail-load', () => {
    win.loadURL('data:text/html,' + encodeURIComponent('<body style="background:#080c0a;color:#eef3ee;font:16px system-ui;display:grid;place-items:center;height:100vh;margin:0;text-align:center"><div><h2>Tenura is offline</h2><p>Check your internet connection, then press Ctrl/Cmd+R to try again.</p></div>'));
  });
}
app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Tenura', submenu: [{ role: 'reload' }, { role: 'toggleDevTools', visible: false }, { type: 'separator' }, { role: 'quit' }] },
    { label: 'Edit', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }] },
    { label: 'View', submenu: [{ role: 'togglefullscreen' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' }] }
  ]));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
