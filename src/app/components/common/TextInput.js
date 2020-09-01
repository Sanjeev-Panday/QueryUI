import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  size,
  id,
  isRequired,
  name,
  value,
  onChange,
  error,
  label,
}) => {
  const style = size ? "form-group " + size : "form-group col-md-6";
  return (
    <div className={style}>
      <label
        htmlFor={id}
        className={isRequired ? "control-label required" : "control-label"}
      >
        <strong>{label}</strong>
      </label>
      <input
        type="text"
        className="form-control"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextInput;
