import React from "react";
import { dataTypes } from "../../../commons/dataTypes";
const QueryForm = (props) => {
  const dataType = dataTypes[props.type.code];
  return (
    <div className="form-group col-md-6">
      <label
        htmlFor={props.id}
        className={
          props.isRequired ? "control-label required" : "control-label"
        }
      >
        <strong>{`${props.name} (${dataType})`}</strong>
      </label>
      <input
        type="text"
        className={props.isRequired ? "form-control" : "form-control"}
        id={props.id}
        value={props.value}
        name={props.name}
      />
    </div>
  );
};
export default QueryForm;
