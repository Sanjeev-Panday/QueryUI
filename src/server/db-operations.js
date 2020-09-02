const connection = require("./db-connection");
const Uuid = require("cassandra-driver").types.Uuid;
const getKeyspaces = async (host, port, dc, params) => {
  const client = await connection(host, port, dc);
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
};

const getTableInfo = async (params, keyspace, table) => {
  const client = await connection(
    params.host,
    params.port,
    params.datacenter,
    params
  );
  return client.metadata.getTable(keyspace, table);
};

const getTables = async (params, keyspace) => {
  const client = await connection(
    params.host,
    params.port,
    params.datacenter,
    params
  );
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM system_schema.tables WHERE keyspace_name = '${keyspace}'`;
    client
      .execute(query)
      .then((result) => {
        let tables = result.rows;
        tables = tables.map((elem) => ({
          table_name: elem.table_name,
          keyspace_name: elem.keyspace_name,
        }));
        tables.sort((first, second) => {
          if (first.table_name > second.table_name) return 1;
          else if (first.table_name < second.table_name) return -1;
          else return 0;
        });
        resolve(tables);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const executeQuery = async (params, query, where) => {
  console.log(query, where);
  const client = await connection(
    params.host,
    params.port,
    params.datacenter,
    params
  );
  return new Promise((resolve, reject) => {
    let rows = [];
    let keys = null;
    client.eachRow(
      query,
      where,
      { prepare: true },
      (n, row) => {
        if (!keys) {
          keys = Object.keys(row);
        }
        keys.forEach((key) => {
          if (row[key] instanceof Uuid) row[key] = row[key].toString();
        });
        rows.push(row);
      },
      (err) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
    /* client
      .execute(query, where, { prepare: true })
      .then((result) => {
        console.log("inside execute query ", result);
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });*/
  });
};
const shutdown = async (params) => {
  const client = await connection(
    params.host,
    params.port,
    params.datacenter,
    params
  );
  return client.shutdown();
};
module.exports = {
  getKeyspaces,
  getTableInfo,
  getTables,
  shutdown,
  executeQuery,
  Uuid,
};
