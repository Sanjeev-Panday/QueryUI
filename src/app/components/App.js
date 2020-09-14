import React from "react";
import ManageConnections from "./Connections/ManageConnections";
import Keyspaces from "./Keyspaces/Keyspaces";
import TableList from "./Tables/TableList";
import TableInfo from "./TableInfo/TableInfo";
import ErrorMessage from "../components/common/ErrorMessage";
import { ToastContainer } from "react-toastify";
import Loader from "./common/Loader";
import ContextMenu from "./common/ContextMenu";
import "./App.scss";
import BaseForm from "../components/Form/BaseForm";
import Confirmation from "./Delete/Delete";
const App = () => {
  return (
    <div className="window-content">
      <Loader />
      <ErrorMessage />
      <TableList />
      <main id="query-content">
        <Confirmation />
        <BaseForm />
      </main>
      <main id="result-content">
        <ContextMenu />
        <Loader />
        <TableInfo />
      </main>
      <aside id="right-content">
        <Keyspaces />
        <ManageConnections />
      </aside>
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default App;
