import React, { useState } from "react";
import { connect } from "react-redux";
import QueryForm from "./QueryForm";
import { bindActionCreators } from "redux";
import * as tableActions from "../../../redux/actions/tableActions";
const Query = (props) => {
  const tableinfo = props.tableinfo;
  const { keyspaceName, name, partitionKeys, clusteringKeys } = tableinfo;
  const [state, setState] = useState({ ...props.queryForm });
  const executeQuery = (event) => {
    event.preventDefault();

    let queryString = `select * from ${keyspaceName}.${name} where `;
    const where = [];
    partitionKeys.forEach((elem) => {
      if (state[elem.name] && state[elem.name].trim() !== "") {
        queryString += elem.name + " = ? and ";
        where.push(state[elem.name]);
      }
    });
    clusteringKeys &&
      clusteringKeys.forEach((elem) => {
        if (state[elem.name] && state[elem.name].trim() !== "") {
          queryString += elem.name + " = ? and ";
          where.push(state[elem.name]);
        }
      });
    queryString =
      queryString.substr(0, queryString.lastIndexOf("and")).trim() + ";";

    props.tableActions.executeQuery(queryString, where);
  };
  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };
  const isPartitionKeysPresent =
    tableinfo.partitionKeys && tableinfo.partitionKeys.length > 0;

  const isClusteringKeysPresent =
    tableinfo.clusteringKeys && tableinfo.clusteringKeys.length > 0;
  return isPartitionKeysPresent ? (
    <>
      <form>
        <QueryForm
          columns={tableinfo.partitionKeys}
          handleChange={handleChange}
          heading="Partition Keys"
          isRequired={true}
        />
        {isClusteringKeysPresent && (
          <QueryForm
            columns={tableinfo.clusteringKeys}
            handleChange={handleChange}
            heading="Clustering Keys"
          />
        )}
        <button
          type="submit"
          className="btn btn-success"
          onClick={executeQuery}
        >
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
    tableinfo: state.table.tableinfo,
    queryForm: state.table.queryForm,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    tableActions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Query);
