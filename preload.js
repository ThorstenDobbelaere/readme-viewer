const { ipcRenderer, contextBridge} = require("electron");

contextBridge.exposeInMainWorld('api', {
    read: (fileName)=> ipcRenderer.invoke('readFile', fileName)
})