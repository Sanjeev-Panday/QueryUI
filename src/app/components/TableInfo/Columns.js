import React from "react";
import TableRow from "./TableRow";
const Columns = ({ label, columns }) => {
  return (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">{label}</th>
        </tr>
      </thead>
      <tbody>
        {columns.map((elem) => (
          <TableRow key={elem.name} name={elem.name} type={elem.type} />
        ))}
      </tbody>
    </table>
  );
};

export default Columns;
