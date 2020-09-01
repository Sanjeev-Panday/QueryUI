import React from "react";
const Table = ({ clickedItem, table, fetchTableMetaData }) => {
  let style = "list-group-item list-group-item-action";
  if (clickedItem === table.table_name) style += " active";
  return (
    <li className={style} onClick={() => fetchTableMetaData(table)}>
      {table.table_name}
    </li>
  );
};
export default Table;
