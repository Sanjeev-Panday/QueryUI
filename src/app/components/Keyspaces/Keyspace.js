import React from "react";

const Keyspace = ({ clickedItem, name, handleClick }) => {
  let style = "list-group-item list-group-item-action";
  if (clickedItem === name) {
    style += " active";
  }
  return (
    <li className={style} onClick={() => handleClick(name)}>
      {name}
    </li>
  );
};

export default Keyspace;
