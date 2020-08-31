import React from "react";
import TableRow from "./TableRow";
const Columns = ({ label, columns }) => {
  return (
    <div className="table-meta-data">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">{label && label}</th>
          </tr>
        </thead>
        <tbody>
          {columns &&
            columns.map((elem) => (
              <TableRow key={elem.name} name={elem.name} type={elem.type} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Columns;
