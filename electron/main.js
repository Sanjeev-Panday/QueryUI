const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const windows = new Set();
const {
  getKeyspaces,
  shutdown,
  getTableInfo,
  executeQuery,
  getTables,
} = require("../src/server/db-operations");
let mainWindow = null;
let connection = null;
app.on("ready", () => {
  mainWindow = createWindow();
});
const createWindow = (exports.createWindow = () => {
  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;
  let newWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 800,
    minHeight: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  newWindow.webContents.loadURL(startUrl);

  newWindow.on("ready-to-show", () => {
    newWindow.show();
  });
  newWindow.on("closed", () => {
    newWindow.removeAllListeners();
    windows.delete(newWindow);
    shutdown(connection);
    mainWindow = null;
    newWindow = null;
  });

  windows.add(newWindow);

  return newWindow;
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    return false;
  }
  app.quit();
});

app.on("activate", (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) createWindow();
});

ipcMain.on("connect:db", (event, data) => {
  getKeyspaces(data.host, data.port, data.datacenter)
    .then((res) => {
      connection = data;
      mainWindow.webContents.send("db:connected", res);
    })
    .catch((err) => {
      let msg = getErrorMessage(err);
      mainWindow.webContents.send("db:connection:failed", msg);
    });
});

ipcMain.on("disconnect:db", (event, params) => {
  shutdown(params)
    .then((res) => {
      mainWindow.webContents.send("db:disconnected");
    })
    .catch((err) => {});
});

ipcMain.on("fetch:tableinfo", async (event, keyspace, table) => {
  getTableInfo(connection, keyspace, table)
    .then((res) => {
      mainWindow.webContents.send("tableinfo:fetched", res);
    })
    .catch((err) => {
      let msg = getErrorMessage(err);
      mainWindow.webContents.send("tableinfo:fetch:failed", msg);
    });
});

ipcMain.on("fetch:tables", (event, keyspace) => {
  getTables(connection, keyspace)
    .then((res) => {
      mainWindow.webContents.send("tables:fetched", res);
    })
    .catch((err) => {
      let msg = getErrorMessage(err);
      mainWindow.webContents.send("tables:fetch:failed", msg);
    });
});

ipcMain.on("execute:query", async (event, query, where) => {
  await executeQuery(connection, query, where)
    .then((res) => {
      console.log(res);
      mainWindow.webContents.send("query:executed", res);
    })
    .catch((err) => {
      console.log(err);
      let msg = getErrorMessage(err);
      mainWindow.webContents.send("query:execution:failed", msg);
    });
});

const getErrorMessage = (err) => {
  let msg = err.innerErrors ? err.innerErrors : {};
  const keys = msg ? Object.keys(msg) : null;
  msg =
    keys && msg[keys[0]]
      ? msg[keys[0]]
      : {
          name: "Error",
          message: "Please check the connection parameters and try again",
        };
  return msg;
};
