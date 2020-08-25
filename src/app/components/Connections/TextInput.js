import React from "react";
import PropTypes from "prop-types";
const TextInput = (props) => {
  let wrapperClass =
    props.name === "port" ? "form-group col-md-3" : "form-group col-md-12";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className="form-row">
      <div className={wrapperClass}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type="text"
          className="form-control"
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};
export default TextInput;
