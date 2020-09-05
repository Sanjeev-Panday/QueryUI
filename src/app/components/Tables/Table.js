import React from "react";
const Table = ({
  clickedItem,
  table,
  fetchTableMetaData,
  onRightClick,
  index,
}) => {
  let style = "list-group-item list-group-item-action";
  if (clickedItem === table.table_name) style += " active";
  return (
    <li
      onContextMenu={() => onRightClick(index)}
      className={style}
      onClick={() => fetchTableMetaData(table)}
    >
      {table.table_name}
    </li>
  );
};
export default Table;
