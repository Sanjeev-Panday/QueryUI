import React from "react";

const TextInput = (props) => {
  const style = props.size ? "form-group " + props.size : "form-group col-md-6";
  return (
    <>
      <div className={style}>
        <label
          htmlFor={props.id}
          className={
            props.isRequired ? "control-label required" : "control-label"
          }
        >
          <strong>{`${props.label}`}</strong>
        </label>
        <input
          type="text"
          className="form-control"
          id={props.id}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </>
  );
};

export default TextInput;
