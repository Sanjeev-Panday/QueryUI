import React from "react";
import ManageConnections from "./Connections/ManageConnections";
import Keyspaces from "./Keyspaces/Keyspaces";
import TableList from "./Tables/TableList";
import TableInfo from "./TableInfo/TableInfo";

const App = () => {
  return (
    <>
      <aside id="left-content">
        <TableList />
      </aside>
      <main id="query-content">
        <div className="query-textarea">
          <textarea />
        </div>
        <div className="query-control">
          <button className="btn btn-success">Execute</button>
        </div>
      </main>
      <main id="result-conent">
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
