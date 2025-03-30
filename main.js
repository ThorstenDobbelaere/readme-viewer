const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("fs");

function logError(err) {
    console.error(err);
}

function createMainWindow() {
    let win = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.loadFile("index.html")
        .catch(logError);
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("readFile", async (event, filePath) => {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (err) {
        logError(err);
        return `Error reading file: ${err.message}`;
    }
});