import React, { useState } from "react";
import Keyspace from "./Keyspace";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dbActions from "../../../redux/actions/dbActions";
import * as tableActions from "../../../redux/actions/tableActions";
import Loader from "../common/Loader";
const Keyspaces = (props) => {
  const [clickedItem, setClickedItem] = useState(-1);
  const handleClick = (index) => {
    const name = props.keyspaces[index];
    props.dbActions.loadTables(name);
    props.tableActions.resetTableData();
    setClickedItem(index);
  };
  return (
    <div id="keyspaces">
      <h4>Keyspaces</h4>
      <Loader />
      {props.keyspaces ? (
        <div className="list-group">
          {props.keyspaces.map((elem, index) => (
            <Keyspace
              clickedItem={clickedItem}
              key={index}
              index={index}
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
function mapDispatchToProps(dispatch) {
  return {
    dbActions: bindActionCreators(dbActions, dispatch),
    tableActions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Keyspaces);
