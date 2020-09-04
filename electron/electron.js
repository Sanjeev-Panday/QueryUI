const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const url = require("url");
const {
  getKeyspaces,
  shutdown,
  getTableInfo,
  executeQuery,
  getTables,
} = require("../src/server/db-operations");
let mainWindow = null;
let connection = null;
let splashScreen = null;
const loadSplashScreen = () => {
  const urlOfLoading = url.format({
    pathname: path.join(__dirname, "../loading.html"),
    protocol: "file:",
    slashes: true,
  });
  splashScreen = new BrowserWindow({
    width: 300,
    height: 350,
    show: false,
    parent: mainWindow,
    frame: false,
    backgroundColor: "#2e2c29",
    center: true,
  });
  console.log(__dirname);
  splashScreen.webContents.loadURL(urlOfLoading);
  splashScreen.webContents.on("did-finish-load", () => {
    //splashScreen.setApplicationMenu(null);
    splashScreen.show();
  });
  splashScreen.on("closed", () => {
    splashScreen = null;
  });
};

app.on("ready", () => {
  loadSplashScreen();
  mainWindow = createWindow();
  Menu.setApplicationMenu(null);
});
const storage = require("electron-json-storage");
const createWindow = () => {
  //const startUrl = "http://localhost:3000";
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  let newWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 800,
    minHeight: 400,
    show: false,
    center: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  newWindow.webContents.loadURL(startUrl);

  newWindow.on("ready-to-show", () => {
    setTimeout(() => {
      newWindow.show();
      if (splashScreen) {
        splashScreen.close();
      }
    }, 2000);
  });
  newWindow.on("closed", () => {
    if (connection) shutdown(connection);
    mainWindow = null;
    newWindow = null;
  });

  return newWindow;
};

app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    return false;
  }
  app.quit();
});

app.on("activate", (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) mainWindow = createWindow();
});

const getAllConnections = () => {
  return new Promise((resolve, reject) => {
    storage.getAll((error, data) => {
      if (!error) {
        const response = [];
        const keys = Object.keys(data);
        keys &&
          keys.forEach((key) => {
            response.push(data[key]);
          });
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
};
ipcMain.on("load:connections", (event) => {
  getAllConnections()
    .then((response) => {
      mainWindow.webContents.send("connections:loaded", response);
    })
    .catch((err) => {
      mainWindow.webContents.send("connections:loaded", []);
    });
});

ipcMain.on("add:connection", (event, connection) => {
  storage.set(connection.connectionName, connection);
  mainWindow.webContents.send("connection:added");
});

ipcMain.on("delete:connection", (event, name) => {
  storage.remove(name, (err) => {
    if (!err) mainWindow.webContents.send("connection:deleted");
  });
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
    .then((rows) => {
      mainWindow.webContents.send("query:executed", rows);
    })
    .catch((err) => {
      let msg = err.message
        ? { name: "Query Error", message: err.message }
        : null;
      if (!msg) msg = getErrorMessage(err);
      mainWindow.webContents.send("query:execution:failed", msg);
    });
});

const getErrorMessage = (err) => {
  let msg = err.innerErrors;
  const keys = msg ? Object.keys(msg) : null;
  msg =
    keys && msg[keys[0]]
      ? msg[keys[0]]
      : {
          name: "Error",
          message: "Please check the parameters and try again",
        };
  return msg;
};
