import React, { useState } from "react";
import Table from "./Table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tableActions from "../../../redux/actions/tableActions";
const TableList = (props) => {
  const [clickedItem, setClickedItem] = useState("");
  const handleFetchTableMetaData = (keyspace, name) => {
    props.actions.loadTableMetaData(keyspace, name);
    setClickedItem(name);
    props.actions.clearTableRows();
  };
  const filterList = (event) => {
    console.log(event.target.value);
  };
  return (
    <aside id="left-content">
      <h4>Tables</h4>
      <input
        class="form-control"
        id="myInput"
        type="text"
        placeholder="Search.."
        onKeyUp={filterList}
      ></input>
      <div className="list-group">
        {props.tables &&
          props.tables.map((elem) => (
            <Table
              isClicked={clickedItem === elem.table_name}
              key={elem.table_name}
              name={elem.table_name}
              keyspace={elem.keyspace_name}
              onFetchTableMetaData={handleFetchTableMetaData}
            />
          ))}
      </div>
    </aside>
  );
};
function mapStateToProps(state) {
  return {
    tables: state.db.tables,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TableList);
