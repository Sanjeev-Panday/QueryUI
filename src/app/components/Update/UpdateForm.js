import React from "react";
import TextInput from "../common/TextInput";
import { dataTypes } from "../../../commons/dataTypes";
const UpdateForm = ({
  columns,
  heading,
  handleChange,
  isRequired,
  error,
  updateForm,
}) => {
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
            disabled={isRequired || dataTypes[elem.type.code] === "udt"}
            name={elem.name}
            type={elem.type}
            error={error && error[elem.name]}
            value={
              updateForm[elem.name]
                ? updateForm[elem.name] instanceof Object
                  ? JSON.stringify(updateForm[elem.name])
                      .toString()
                      .replace(/^"(.*)"$/, "$1")
                  : updateForm[elem.name]
                : ""
            }
            onChange={handleChange}
          />
        ))}
      </div>
    </>
  );
};

export default UpdateForm;
