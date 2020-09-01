import React from "react";
import Columns from "./Columns";
import { connect } from "react-redux";
import QueryResults from "../Query/QueryResults";
import PropTypes from "prop-types";
const TableInfo = ({ rows, tableinfo }) => {
  const { partitionKeys, clusteringKeys, columns } = tableinfo;
  const displayTableMetaData = !rows || rows.length === 0;
  return (
    <>
      <div className="tableinfo">
        <QueryResults />
      </div>
      <div className="tableinfo">
        {displayTableMetaData && tableinfo && columns && (
          <>
            <Columns label="Columns" columns={columns} />
            <Columns label="Partition Keys" columns={partitionKeys} />
            {clusteringKeys && clusteringKeys.length > 0 && (
              <Columns label="Clustering Keys" columns={clusteringKeys} />
            )}
          </>
        )}
      </div>
    </>
  );
};

TableInfo.propTypes = {
  rows: PropTypes.array,
  tableinfo: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tableinfo: state.table.tableinfo,
    rows: state.table.tablerows,
  };
}
export default connect(mapStateToProps)(TableInfo);
