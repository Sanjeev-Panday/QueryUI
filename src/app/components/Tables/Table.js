import React from "react";
const Table = ({ isClicked, name, keyspace, onFetchTableMetaData }) => {
  const handler = (keyspace, name) => {
    onFetchTableMetaData(keyspace, name);
  };
  let style = "list-group-item list-group-item-action";
  if (isClicked) style += " active";
  return (
    <li className={style} onClick={() => handler(keyspace, name)}>
      {name}
    </li>
  );
};
export default Table;
