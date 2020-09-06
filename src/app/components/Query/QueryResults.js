import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/Query.css";

import { showContextMenu } from "../../../redux/actions/tableActions";

const QueryResults = ({ rows, showContextMenu }) => {
  const handleRightClick = (index) => {
    showContextMenu(index, "row");
  };
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
      <tr key={index} onContextMenu={() => handleRightClick(index)}>
        {keys.map((key) => (
          <td key={key + index}>
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
    <div className="query-result">
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
const mapDispatchToProps = {
  showContextMenu,
};
export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
