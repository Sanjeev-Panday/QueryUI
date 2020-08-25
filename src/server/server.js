const cors = require("cors");
const JSONFileStorage = require("node-json-file-storage");
const {
  getKeyspaces,
  getTableInfo,
  getTables,
  shutdown,
} = require("./db-operations");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const file_uri = __dirname + "/connection-config.json";
const connections = new JSONFileStorage(file_uri);

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/connections", (req, res) => {
  const listOfConnections = connections.all();
  const keys = Object.keys(listOfConnections);
  const response = [];
  keys.forEach((elem) => {
    const obj = connections.get(elem).connection;
    obj.connectionName = elem;
    response.push(obj);
  });
  res.status(200).send(response);
});

app.post("/connect", (req, res) => {
  const connection = req.body.connection;
  console.log(connection);
  const params = { host: app.locals.host, port: app.locals.port };
  getKeyspaces(connection.host, connection.port, params)
    .then((keyspaces) => {
      connections.put({ id: [connection.name], connection });
      app.locals.host = connection.host;
      app.locals.port = connection.port;
      res.status(200).send(keyspaces);
    })
    .catch((err) => {
      res.status(500).send([]);
    });
});

app.get("/tableinfo/:keyspace/:table", (req, res) => {
  const params = { host: app.locals.host, port: app.locals.port };
  getTableInfo(params, req.params.keyspace, req.params.table)
    .then((tableInfo) => {
      res.status(200).send(tableInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/keyspace-info/:keyspace", (req, res) => {
  const params = { host: app.locals.host, port: app.locals.port };
  getTables(params, req.params.keyspace)
    .then((tables) => {
      res.status(200).send(tables);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/shutdown", (req, res) => {
  const params = { host: app.locals.host, port: app.locals.port };
  shutdown(params)
    .then((res) => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(200).send();
    });
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
