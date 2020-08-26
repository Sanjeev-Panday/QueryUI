import React, { useState } from "react";
import Table from "./Table";
import { connect } from "react-redux";
import { fetchTableMetaData } from "../../../api/apiCalls";
import { bindActionCreators } from "redux";
import * as tableActions from "../../../redux/actions/tableActions";
const TableList = (props) => {
  const [clickedItem, setClickedItem] = useState("");
  const handleClick = (keyspace, name) => {
    fetchTableMetaData(keyspace, name)
      .then((res) => {
        console.log(res.data);
        const tableinfo = res.data;
        tableinfo.keyspace_name = keyspace;
        props.actions.loadTableMetaData(tableinfo);
        setClickedItem(name);
        props.actions.clearTableRows();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h4>Tables</h4>
      <div className="list-group">
        {props.tables &&
          props.tables.map((elem) => (
            <Table
              isClicked={clickedItem === elem.table_name}
              key={elem.table_name}
              name={elem.table_name}
              keyspace={elem.keyspace_name}
              handleClick={handleClick}
            />
          ))}
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    tables: state.tables,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TableList);
