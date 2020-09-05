const {
  app,
  BrowserWindow,
  ipcMain,
  clipboard,
  dialog,
  Menu,
  shell,
} = require("electron");
const path = require("path");
const url = require("url");
const {
  getKeyspaces,
  shutdown,
  getTableInfo,
  executeQuery,
  getTables,
} = require("../src/server/db-operations");
const fs = require("fs");
let mainWindow = null;
let connection = null;
let splashScreen = null;
let menu;
let applicationTemplate;
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
  installDevToolExtensions();
  loadSplashScreen();
  mainWindow = createWindow();
  if (process.env.NODE_ENV === "development") {
    mainWindow.openDevTools();
  }
  if (process.platform === "darwin") {
    applicationTemplate = [
      {
        label: "DBGlass",
        submenu: [
          {
            label: "About QueryUI",
            selector: "orderFrontStandardAboutPanel:",
          },
          {
            type: "separator",
          },
          {
            label: "Hide QueryUI",
            accelerator: "Command+H",
            selector: "hide:",
          },
          {
            label: "Hide Others",
            accelerator: "Command+Shift+H",
            selector: "hideOtherApplications:",
          },
          {
            label: "Show All",
            selector: "unhideAllApplications:",
          },
          {
            type: "separator",
          },
          {
            label: "Quit",
            accelerator: "Command+Q",
            click() {
              app.quit();
            },
          },
        ],
      },
      {
        label: "Edit",
        submenu: [
          {
            label: "Undo",
            accelerator: "Command+Z",
            selector: "undo:",
          },
          {
            label: "Redo",
            accelerator: "Shift+Command+Z",
            selector: "redo:",
          },
          {
            type: "separator",
          },
          {
            label: "Cut",
            accelerator: "Command+X",
            selector: "cut:",
          },
          {
            label: "Copy",
            accelerator: "Command+C",
            selector: "copy:",
          },
          {
            label: "Paste",
            accelerator: "Command+V",
            selector: "paste:",
          },
          {
            label: "Select All",
            accelerator: "Command+A",
            selector: "selectAll:",
          },
        ],
      },
      {
        label: "View",
        submenu:
          process.env.NODE_ENV === "development"
            ? [
                {
                  label: "Reload",
                  accelerator: "Command+R",
                  click() {
                    mainWindow.webContents.send("reload");
                  },
                },
                {
                  label: "Toggle Full Screen",
                  accelerator: "Ctrl+Command+F",
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  },
                },
                {
                  label: "Toggle Developer Tools",
                  accelerator: "Alt+Command+I",
                  click() {
                    mainWindow.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: "Toggle Full Screen",
                  accelerator: "Ctrl+Command+F",
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  },
                },
              ],
      },
      {
        label: "Window",
        submenu: [
          {
            label: "Minimize",
            accelerator: "Command+M",
            selector: "performMiniaturize:",
          },
          {
            label: "Close",
            accelerator: "Command+W",
            selector: "performClose:",
          },
          {
            type: "separator",
          },
          {
            label: "Bring All to Front",
            selector: "arrangeInFront:",
          },
        ],
      },
      {
        label: "Help",
        submenu: [
          {
            label: "Learn More",
            click() {
              shell.openExternal(
                "https://github.com/Sanjeev-Panday/cassandra-explorer"
              );
            },
          },
          {
            label: "Contact",
          },
        ],
      },
    ];
    menu = Menu.buildFromTemplate(applicationTemplate);
    Menu.setApplicationMenu(menu);
  } else {
    applicationTemplate = [
      {
        label: "&View",
        submenu:
          process.env.NODE_ENV === "development"
            ? [
                {
                  label: "&Reload",
                  accelerator: "Ctrl+R",
                  click() {
                    mainWindow.reload();
                  },
                },
                {
                  label: "Toggle &Full Screen",
                  accelerator: "F11",
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  },
                },
                {
                  label: "Toggle &Developer Tools",
                  accelerator: "Alt+Ctrl+I",
                  click() {
                    mainWindow.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: "Toggle &Full Screen",
                  accelerator: "F11",
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  },
                },
              ],
      },
      {
        label: "Help",
        submenu: [
          {
            label: "Learn More",
            click() {
              shell.openExternal(
                "https://github.com/Sanjeev-Panday/cassandra-explorer"
              );
            },
          },
          {
            label: "Contact",
          },
        ],
      },
    ];

    menu = Menu.buildFromTemplate(applicationTemplate);
    mainWindow.setMenu(menu);
  }
});
const storage = require("electron-json-storage");
const createWindow = () => {
  const startUrl =
    process.env.NODE_ENV === "devlopment"
      ? "http://localhost:3000"
      : url.format({
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
      enableRemoteModule: true,
    },
  });
  newWindow.webContents.loadURL(startUrl);

  newWindow.on("ready-to-show", () => {
    newWindow.show();
    if (splashScreen) {
      splashScreen.close();
    }
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

ipcMain.on("save:row", async (event, rows) => {
  dialog
    .showSaveDialog(mainWindow, {
      title: "Save",
      defaultPath: app.getPath("documents"),
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    })
    .then(({ canceled, filePath }) => {
      if (canceled) return;
      fs.writeFile(filePath, rows, (err) => {
        if (!err) event.sender.send("row:saved");
        else event.sender.send("row:save:failed");
      });
    });
});

ipcMain.on("copy:row", (event, row) => {
  clipboard.writeText(row);
  event.sender.send("row:copied");
});
const installDevToolExtensions = async () => {
  if (process.env.NODE_ENV === "development") {
    const installer = require("electron-devtools-installer");
    const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {}
    }
  }
};
