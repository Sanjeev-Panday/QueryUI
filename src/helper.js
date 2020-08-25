const DB = require("./server/db");

let stdin = process.openStdin();
stdin.addListener("data", (ans) => {
  switch (ans.toString().trim()) {
    case "c":
      DB.connect();
      break;
    case "k":
      DB.getKeypsaces().then((keyspace) => {
        console.log(keyspace);
      });
      break;
    case "t":
      DB.getTables("development")
        .then((tables) => {
          console.log(tables);
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    case "ti":
      DB.getTableInfo("development", "spacecraft_journey_catalog")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    case "s":
      DB.shutdown();
      break;
    default:
      console.log("invlaid option");
  }
});
