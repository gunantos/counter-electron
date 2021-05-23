/*
 * @Author: Gunanto Simamora
 * @Date:   2020-10-25 15:02:09
 * @Last Modified by: Gunanto Simamora
 * @Last Modified time: 2021-05-23 14:34:47
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minimizable: false,
    closable: false,
    fullscreen: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    kiosk: true,
   titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, 
      webSecurity: false,
      allowRunningInsecureContent: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("public/index.html");
  
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const ret = globalShortcut.register('F11', () => {
    return;
  })

  if (!ret) {
    console.log('registration failed')
  }
  
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  globalShortcut.unregisterAll()
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
