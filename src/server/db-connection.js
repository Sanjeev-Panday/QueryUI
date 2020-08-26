const cassandra = require("cassandra-driver");
// This is to create a connection with cassandra

let client = null;
async function connection(
  host = "localhost",
  port = "9042",
  dc,
  prevConn = {}
) {
  const connectionParams = {
    contactPoints: [`${host}:${port}`],
    localDataCenter: dc,
    keyspace: "system",
    protocolOptions: {
      port: port,
    },
  };

  if (client) {
    if (prevConn && prevConn.host === host && prevConn.port === port)
      return client;
    else client.shutdown();
  }
  client = await new cassandra.Client(connectionParams);
  client.on("log", (level, loggerName, message, furtherInfo) => {
    if (level === "error") console.log(`${level}-${loggerName}: ${message}`);
  });
  return client;
}
//Export the connection to other modules
module.exports = connection;
