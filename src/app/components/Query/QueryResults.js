import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const QueryResults = ({ rows }) => {
  const tableHeader = (elem) => {
    const keys = Object.keys(elem);
    return (
      <tr>
        {keys.map((key) => (
          <th scope="col">{key}</th>
        ))}
      </tr>
    );
  };

  const tableRow = (elem) => {
    const keys = Object.keys(elem);
    return (
      <tr>
        {keys.map((key) => (
          <td>{elem[key] && elem[key].toString()}</td>
        ))}
      </tr>
    );
  };
  const rowsPresent = rows && rows.length > 0;
  return rowsPresent ? (
    <div class="query-result">
      <table className="table table-bordered">
        <thead className="thead-dark">{rows && tableHeader(rows[0])}</thead>
        <tbody>{rows && rows.map((elem) => tableRow(elem))}</tbody>
      </table>
    </div>
  ) : (
    <></>
  );
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
