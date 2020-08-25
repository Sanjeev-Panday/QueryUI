const cassandra = require("cassandra-driver");
// This is to create a connection with cassandra

let client = null;
async function connection(host = "localhost", port = "9042", prevConn = {}) {
  const connectionParams = {
    contactPoints: [`${host}:${port}`],
    localDataCenter: "datacenter1",
  };

  if (client) {
    if (prevConn && prevConn.host === host && prevConn.port === port)
      return client;
    else client.shutdown();
  }
  console.log(prevConn);
  client = await new cassandra.Client(connectionParams);
  client.on("log", (level, loggerName, message, furtherInfo) => {
    if (level === "info") console.log(`${level}-${loggerName}: ${message}`);
  });
  return client;
}
//Export the connection to other modules
module.exports = connection;
