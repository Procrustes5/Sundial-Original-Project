'use strict';var electron=require('electron'),path=require('path');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null);if(e){Object.keys(e).forEach(function(k){if(k!=='default'){var d=Object.getOwnPropertyDescriptor(e,k);Object.defineProperty(n,k,d.get?d:{enumerable:true,get:function(){return e[k]}});}})}n["default"]=e;return Object.freeze(n)}var path__default=/*#__PURE__*/_interopDefaultLegacy(path);const isDevelopment = ("" + process.env.NODE_ENV).trim() === "development";

async function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path__default["default"].join(__dirname, "preload.js"),
    },
  });

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    await win.loadURL("http://localhost:3000/");
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    win.loadURL(`file://${__dirname}/index.html`);
  }
  win.webContents.openDevTools();
}

electron.app.whenReady().then(() => {
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    const installExtension = (await Promise.resolve().then(function(){return /*#__PURE__*/_interopNamespace(require('electron-devtools-installer'))}))
      .default;
    const VUEJS3_DEVTOOLS = (await Promise.resolve().then(function(){return /*#__PURE__*/_interopNamespace(require('electron-devtools-installer'))}))
      .VUEJS3_DEVTOOLS;

    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        electron.app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      electron.app.quit();
    });
  }
}//# sourceMappingURL=background.js.map
