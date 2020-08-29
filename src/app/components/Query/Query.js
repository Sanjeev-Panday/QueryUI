import React, { useState } from "react";
import { connect } from "react-redux";
import QueryForm from "./QueryForm";
import { executeQueryOnHost } from "../../../api/apiCalls";
import { bindActionCreators } from "redux";
import * as tableActions from "../../../redux/actions/tableActions";
import { ToastContainer, toast } from "react-toastify";
const Query = (props) => {
  const tableinfo = props.tableinfo;
  const [state, setState] = useState({});
  const executeQuery = (event) => {
    event.preventDefault();
    const { keyspace_name, name, partitionKeys, clusteringKeys } = tableinfo;

    let queryString = `select * from ${keyspace_name}.${name} where `;
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
    executeQueryOnHost(queryString, where)
      .then((res) => {
        if (!res.data || res.data.length === 0) {
          toast.warn("No rows fetched !!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        props.tableActions.fetchTableRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <ToastContainer />
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
function mapDispatchToProps(dispatch) {
  return {
    tableActions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Query);
