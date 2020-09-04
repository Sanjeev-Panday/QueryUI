import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/Query.css";
import ContextMenu from "../common/ContextMenu";

const QueryResults = ({ rows }) => {
  const tableHeader = (elem) => {
    const keys = Object.keys(elem);
    return (
      <tr>
        {keys.map((key) => (
          <th key={key} scope="col">
            {key}
          </th>
        ))}
      </tr>
    );
  };

  const tableRow = (elem, index) => {
    const keys = Object.keys(elem);
    return (
      <tr>
        {keys.map((key) => (
          <td>
            {elem[key] &&
              (elem[key] instanceof Object
                ? JSON.stringify(elem[key])
                : elem[key].toString())}
          </td>
        ))}
      </tr>
    );
  };
  const rowsPresent = rows && rows.length > 0;
  return rowsPresent ? (
    <div class="query-result">
      <ContextMenu />
      <table id="mt" className="table table-bordered table-hover">
        <thead className="thead-dark">{rows && tableHeader(rows[0])}</thead>
        <tbody>
          {rows && rows.map((elem, index) => tableRow(elem, index))}
        </tbody>
      </table>
    </div>
  ) : null;
};

QueryResults.propTypes = {
  rows: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    rows: state.table.tablerows,
  };
}
export default connect(mapStateToProps)(QueryResults);
