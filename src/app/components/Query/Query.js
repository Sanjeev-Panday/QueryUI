import React from "react";
import { connect } from "react-redux";
import QueryForm from "./QueryForm";
const Query = ({ tableinfo }) => {
  return tableinfo.partitionKeys ? (
    <>
      <form className="row query-form">
        <div className="col-md-6">
          <h5>Partition Keys</h5>
          {tableinfo.partitionKeys &&
            tableinfo.partitionKeys.map((elem) => (
              <QueryForm id={elem.name} name={elem.name} type={elem.type} />
            ))}
        </div>
        {tableinfo.clusteringKeys.length > 0 && (
          <div className="col-md-6">
            <h5>Clustering Keys</h5>

            {tableinfo.clusteringKeys.map((elem) => (
              <QueryForm id={elem.name} name={elem.name} type={elem.type} />
            ))}
          </div>
        )}
      </form>
      <button className="btn btn-success action">Execute</button>
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
