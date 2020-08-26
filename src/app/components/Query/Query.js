import React from "react";
import { connect } from "react-redux";
import Columns from "../TableInfo/Columns";
const Query = ({ tableinfo }) => {
  return (
    <main id="query">
      <h4> Query</h4>
      {tableinfo && (
        <>
          <Columns label="Partition Keys" columns={tableinfo.partitionKeys} />
          <Columns label="Clustering Keys" columns={tableinfo.clusteringKeys} />
        </>
      )}
    </main>
  );
};
function mapStateToProps(state) {
  return {
    tableinfo: state.tableinfo,
  };
}
export default connect(mapStateToProps)(Query);
