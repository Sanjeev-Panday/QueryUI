const cors = require("cors");
const JSONFileStorage = require("node-json-file-storage");
const {
  getKeyspaces,
  getTableInfo,
  getTables,
  shutdown,
  executeQuery,
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

app.post("/execute", (req, res) => {
  const where = req.body.where;
  const query = req.body.query;
  const params = app.locals.connection;
  executeQuery(params, query, where)
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/connect", (req, res) => {
  const connection = req.body.connection;
  const params = app.locals.connection;
  getKeyspaces(connection.host, connection.port, connection.datacenter, params)
    .then((keyspaces) => {
      connections.put({ id: [connection.name], connection });
      app.locals.connection = connection;
      res.status(200).send(keyspaces);
    })
    .catch((err) => {
      res.status(500).send([]);
    });
});

app.get("/tableinfo/:keyspace/:table", (req, res) => {
  const params = app.locals.connection;
  getTableInfo(params, req.params.keyspace, req.params.table)
    .then((tableInfo) => {
      res.status(200).send(tableInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/keyspace-info/:keyspace", (req, res) => {
  const params = app.locals.connection;
  getTables(params, req.params.keyspace)
    .then((tables) => {
      res.status(200).send(tables);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/shutdown", (req, res) => {
  const params = app.locals.connection;
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
