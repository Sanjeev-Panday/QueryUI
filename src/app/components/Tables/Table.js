import React from "react";
const Table = ({ isClicked, name, keyspace, onFetchTableMetaData }) => {
  const handler = (keyspace, name) => {
    onFetchTableMetaData(keyspace, name);
  };
  let style = "list-group-item list-group-item-action";
  if (isClicked) style += " active";
  return (
    <div className={style} onClick={() => handler(keyspace, name)}>
      {name}
    </div>
  );
};
export default Table;
