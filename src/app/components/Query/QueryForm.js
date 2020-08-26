import React from "react";
import TextInput from "../Connections/TextInput";
import { dataTypes } from "../../../commons/dataTypes";
const QueryForm = (props) => {
  const dataType = dataTypes[props.type.code];
  return (
    <TextInput
      type="text"
      id={props.id}
      value={props.value}
      label={`${props.name} (${dataType})`}
      name={props.name}
    />
  );
};
export default QueryForm;
