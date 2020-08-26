import React from "react";
import Columns from "./Columns";
import { connect } from "react-redux";
const TableInfo = ({ tableinfo }) => {
  return (
    <div className="tableinfo">
      {tableinfo && tableinfo.columns && (
        <>
          <Columns label="Columns" columns={tableinfo.columns} />
        </>
      )}
    </div>
  );
};
function mapStateToProps(state) {
  return {
    tableinfo: state.tableinfo,
  };
}
export default connect(mapStateToProps)(TableInfo);
