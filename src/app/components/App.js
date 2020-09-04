import React from "react";
import ManageConnections from "./Connections/ManageConnections";
import Keyspaces from "./Keyspaces/Keyspaces";
import TableList from "./Tables/TableList";
import TableInfo from "./TableInfo/TableInfo";
import Query from "./Query/Query";
import ErrorMessage from "../components/common/ErrorMessage";
import { ToastContainer } from "react-toastify";
import Loader from "./common/Loader";
import "./App.scss";
const App = () => {
  return (
    <div className="window">
      <div className="window-content">
        <Loader />
        <ErrorMessage />
        <TableList />
        <main id="query-content">
          <Query />
        </main>
        <main id="result-content">
          <Loader />
          <TableInfo />
        </main>
        <aside id="right-content">
          <Keyspaces />
          <ManageConnections />
        </aside>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
