import React from "react";
const Keyspace = ({ clickedItem, index, name, handleClick }) => {
  const handler = (index) => {
    handleClick(index);
  };
  const style =
    clickedItem === index
      ? "list-group-item list-group-item-action active"
      : "list-group-item list-group-item-action";
  return (
    <li className={style} onClick={() => handler(index)}>
      {name}
    </li>
  );
};

export default Keyspace;
