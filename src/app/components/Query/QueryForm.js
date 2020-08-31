import React from "react";
import TextInput from "../common/TextInput";
import { dataTypes } from "../../../commons/dataTypes";
import PropTypes from "prop-types";
const QueryForm = ({ columns, heading, handleChange, isRequired }) => {
  return (
    <>
      <p className="info-heading">{heading}</p>

      <div className="form-row">
        {columns.map((elem) => (
          <TextInput
            key={elem.name}
            label={`${elem.name} (${dataTypes[elem.type.code]})`}
            isRequired={isRequired}
            id={elem.name}
            name={elem.name}
            type={elem.type}
            onChange={handleChange}
          />
        ))}
      </div>
    </>
  );
};
QueryForm.propTypes = {
  columns: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};
export default QueryForm;
