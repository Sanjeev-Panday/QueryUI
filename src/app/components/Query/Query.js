import React from "react";
import { connect } from "react-redux";
import QueryForm from "./QueryForm";
const Query = ({ tableinfo }) => {
  const isPartitionKeysPresent =
    tableinfo.partitionKeys && tableinfo.partitionKeys.length > 0;

  const isClusteringKeysPresent =
    tableinfo.clusteringKeys && tableinfo.clusteringKeys.length > 0;
  return isPartitionKeysPresent ? (
    <>
      <form>
        <p className="info-heading">Partition Keys</p>

        <div className="form-row">
          {tableinfo.partitionKeys &&
            tableinfo.partitionKeys.map((elem) => (
              <QueryForm
                isRequired={true}
                id={elem.name}
                name={elem.name}
                type={elem.type}
              />
            ))}
        </div>
        {isClusteringKeysPresent && (
          <>
            <p className="info-heading">Clustering Keys</p>
            <div className="form-row">
              {tableinfo.clusteringKeys.length > 0 &&
                tableinfo.clusteringKeys.map((elem) => (
                  <QueryForm
                    isRequired={false}
                    id={elem.name}
                    name={elem.name}
                    type={elem.type}
                  />
                ))}
            </div>
          </>
        )}
        <button type="submit" className="btn btn-success">
          Execute
        </button>
      </form>
    </>
  ) : (
    <div className="info">
      <div className="alert alert-success" role="alert">
        <h5 className="alert-heading">Query form!</h5>
        <p>
          You will get a form to execute CQL queries after you select a table
          from <b>Tables</b> section in the left pannel
        </p>
        <hr />
        <p className="mb-0">
          To fetch list of tables please select a keyspace from the
          <b> keyspaces </b>
          section.
        </p>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    tableinfo: state.tableinfo,
  };
}
export default connect(mapStateToProps)(Query);
