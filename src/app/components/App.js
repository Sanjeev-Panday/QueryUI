import React from "react";
import ManageConnections from "./Connections/ManageConnections";
import Keyspaces from "./Keyspaces/Keyspaces";
import TableList from "./Tables/TableList";
import TableInfo from "./TableInfo/TableInfo";
import Query from "./Query/Query";
import ErrorMessage from "../components/common/ErrorMessage";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <ErrorMessage />
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
      <ToastContainer />
    </>
  );
};

export default App;
