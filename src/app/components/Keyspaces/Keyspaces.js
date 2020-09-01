import React, { useState } from "react";
import Keyspace from "./Keyspace";
import { connect } from "react-redux";
import { loadTables } from "../../../redux/actions/dbActions";
import { resetTableData } from "../../../redux/actions/tableActions";

const Keyspaces = ({ loadTables, resetTableData, keyspaces }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const handleClick = (name) => {
    loadTables(name);
    resetTableData();
    setSelectedItem(name);
  };
  return (
    <div id="keyspaces">
      <h4>Keyspaces</h4>
      {keyspaces ? (
        <div className="list-group">
          {keyspaces.map((elem, index) => (
            <Keyspace
              clickedItem={selectedItem}
              key={index}
              name={elem}
              handleClick={handleClick}
            />
          ))}
        </div>
      ) : (
        <p>Keyspace not present!</p>
      )}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    keyspaces: state.db.keyspaces,
  };
}
const mapDispatchToProps = {
  loadTables,
  resetTableData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Keyspaces);
