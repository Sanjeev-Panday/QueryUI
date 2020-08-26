import React from "react";
import ManageConnections from "./Connections/ManageConnections";
import Keyspaces from "./Keyspaces/Keyspaces";
import TableList from "./Tables/TableList";
import TableInfo from "./TableInfo/TableInfo";
import Query from "./Query/Query";

const App = () => {
  return (
    <>
      <aside id="left-content">
        <TableList />
      </aside>
      <main id="query-content">
        <Query />
      </main>

      <main id="result-content">
        <TableInfo />
      </main>
      <aside id="right-content">
        <Keyspaces />
        <ManageConnections />
      </aside>
    </>
  );
};

export default App;
