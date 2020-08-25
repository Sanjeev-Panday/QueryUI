import React from "react";
import Columns from "./Columns";
import { connect } from "react-redux";
const TableInfo = ({ tableinfo }) => {
  return (
    <div className="tableinfo">
      {tableinfo && tableinfo.columns && (
        <>
          <Columns label="Columns" columns={tableinfo.columns} />
          <Columns label="Partition Keys" columns={tableinfo.partitionKeys} />
          <Columns label="Clustering Keys" columns={tableinfo.clusteringKeys} />
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
