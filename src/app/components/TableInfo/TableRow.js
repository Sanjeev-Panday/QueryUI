import React from "react";
import { dataTypes } from "../../../commons/dataTypes";

const TableRow = ({ name, type }) => {
  const dataType = dataTypes[type.code];
  return (
    <tr>
      <td>{name}</td>
      <td>{dataType}</td>
    </tr>
  );
};
export default TableRow;
