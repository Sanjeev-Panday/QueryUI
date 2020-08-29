const connection = require("./db-connection");

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
  const client = await connection(
    params.host,
    params.port,
    params.datacenter,
    params
  );
  return client.execute(query, where);
};
const shutdown = async (params) => {
  const client = await connection(
    params.host,
    params.port,
    params.datacenter,
    params
  );
  return await client.shutdown();
};
module.exports = {
  getKeyspaces,
  getTableInfo,
  getTables,
  shutdown,
  executeQuery,
};
