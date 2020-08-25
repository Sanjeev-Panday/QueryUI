const client = require("./db-connection");
class DB {
  static connect() {
    this.getKeypsaces()
      .then((response) => {
        console.log("connection succesful", response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  // This method will connect to the DB and return a promise
  // That promise will be used to fetch the keyspaces
  static getKeyspaces() {
    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(() => {
          const keyspaces = Object.keys(client.metadata.keyspaces);
          resolve(keyspaces);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // For the given keyspace this will return a promise will all the tables under that keyspace
  static getTables(keyspace) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM system_schema.tables WHERE keyspace_name = '${keyspace}'`;
      client
        .execute(query)
        .then((result) => {
          const tables = result.rows;
          tables.sort((first, second) => {
            if (first.name > second.name) return 1;
            else if (first.name < second.name) return -1;
            else return 0;
          });
          resolve(tables);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // This method will return a promsie which will return table info like columns, parttion key, clustering colums etc.
  static getTableInfo(keyspace, table) {
    return client.metadata.getTable(keyspace, table);
  }

  static shutdown() {
    client.shutdown();
  }
}

module.exports = DB;
