import React from "react";
import Columns from "./Columns";
import { connect } from "react-redux";
import QueryResults from "../QueryResults/QueryResults";
const TableInfo = ({ rows, tableinfo }) => {
  const displayTableMetaData = !rows || rows.length === 0;
  return (
    <>
      <div className="tableinfo">
        <QueryResults />
      </div>
      <div className="tableinfo">
        {displayTableMetaData && tableinfo && tableinfo.columns && (
          <>
            <Columns label="Columns" columns={tableinfo.columns} />
            <Columns label="Partition Keys" columns={tableinfo.partitionKeys} />
            <Columns
              label="Clustering Keys"
              columns={tableinfo.clusteringKeys}
            />
          </>
        )}
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    tableinfo: state.tableinfo,
    rows: state.tablerows,
  };
}
export default connect(mapStateToProps)(TableInfo);
