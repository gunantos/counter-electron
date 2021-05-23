/*
 * @Author: Gunanto Simamora
 * @Date:   2020-10-25 15:20:50
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-05-22 05:40:34
 */
let { remote } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");

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