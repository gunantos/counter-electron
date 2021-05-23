/*
 * @Author: Gunanto Simamora
 * @Date:   2020-10-25 15:20:50
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-05-23 16:05:18
 */
const { remote, ipcRenderer } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");
const notification = new bootstrap.Modal(document.getElementById('notification'), {
  backdrop: false,
  keyboard: false,
  focus: true
});

const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const version = document.getElementById('version');
ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      version.innerText = 'Version ' + arg.version;
    });
let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers
console.log(printers);

  var options = `
    <option selected>Pilih Printer</option>`;
printers.map((item, index) => {
  //write in the screen the printers for choose
  options += `
    <option value="${item.name}">${item.name}</option>
  `;
});

  document.getElementById("list_printers").innerHTML = options;
function print(d, printerName, widthPage) {
  const options = {
    preview: false, // Preview in window or print
    width: widthPage, //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };
  
  if (printerName && widthPage) {
    PosPrinter.print(d, options)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Select the printer and the width");
  }
}
ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.show();
});
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('disabled');
  notification.show();
});
function closeNotification() {
  notification.hide();
}
function restartApp() {
  ipcRenderer.send('restart_app');
}
function closeApp() {
   ipcRenderer.send('close_app');
}