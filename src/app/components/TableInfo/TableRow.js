import React from "react";
import { dataTypes } from "../../../commons/dataTypes";
import PropTypes from "prop-types";

const TableRow = ({ name, type }) => {
  const dataType = dataTypes[type.code];
  return (
    <tr>
      <td>{`${name} (${dataType})`}</td>
    </tr>
  );
};

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.object.isRequired,
};

export default TableRow;
