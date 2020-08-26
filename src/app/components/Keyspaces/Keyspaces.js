import React, { useState } from "react";
import Keyspace from "./Keyspace";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as keyspaceActions from "../../../redux/actions/keyspaceActions";
import * as tableActions from "../../../redux/actions/tableActions";
import { fetchTableList } from "../../../api/apiCalls";
const Keyspaces = (props) => {
  const [clickedItem, setClickedItem] = useState(-1);
  const handleClick = (index) => {
    const name = props.keyspaces[index];
    fetchTableList(name)
      .then((tables) => {
        console.log(tables);
        props.keyspaceActions.loadTables(tables.data);
        props.tableActions.clearTableMetaData();
        setClickedItem(index);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="keyspaces">
      <h4>Keyspaces</h4>
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
    keyspaces: state.keyspaces,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    keyspaceActions: bindActionCreators(keyspaceActions, dispatch),
    tableActions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Keyspaces);
