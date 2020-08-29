import React from "react";
import { connect } from "react-redux";

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
          <td>{elem[key]}</td>
        ))}
      </tr>
    );
  };
  const isTableRowsPresent = rows && rows.length > 0;
  return isTableRowsPresent ? (
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

function mapStateToProps(state) {
  return {
    rows: state.tablerows,
  };
}
export default connect(mapStateToProps)(QueryResults);
