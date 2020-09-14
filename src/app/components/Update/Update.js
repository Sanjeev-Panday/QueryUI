import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateRow, executeQuery } from "../../../redux/actions/tableActions";
import { Button } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import { toast } from "react-toastify";
const Update = ({ tableinfo, updateTableForm, updateRow, executeQuery }) => {
  const [updateForm, setUpdateForm] = useState(updateTableForm);
  useEffect(() => {
    setUpdateForm(updateTableForm);
  }, [updateTableForm]);
  const {
    columns,
    keyspaceName,
    name,
    partitionKeys,
    clusteringKeys,
  } = tableinfo;
  const primaryKey = partitionKeys.concat(clusteringKeys);

  const remainingColums = columns.filter((col) => {
    for (let i = 0; i < primaryKey.length; i++) {
      if (primaryKey[i].name === col.name) return false;
    }
    return true;
  });

  const handleRowUpdate = (event) => {
    event.preventDefault();
    let queryString = `update ${keyspaceName}.${name} set `;
    const params = [];
    remainingColums.forEach((elem) => {
      if (
        updateForm[elem.name] &&
        updateForm[elem.name].toString().trim() !== "" &&
        updateTableForm[elem.name] !== updateForm[elem.name]
      ) {
        queryString += elem.name + " = ? , ";
        params.push(updateForm[elem.name]);
      }
    });

    if (params.length === 0) {
      toast.error("Nothing to update");
      return;
    }

    queryString =
      queryString.substr(0, queryString.lastIndexOf(",")).trim() + ` where `;

    primaryKey.forEach((elem) => {
      queryString += elem.name + " = ? and ";

      params.push(
        updateTableForm[elem.name] instanceof Object
          ? JSON.stringify(updateTableForm[elem.name])
              .toString()
              .replace(/^"(.*)"$/, "$1")
          : updateTableForm[elem.name]
      );
    });
    queryString =
      queryString.substr(0, queryString.lastIndexOf("and")).trim() + `;`;

    updateRow(queryString, params, updateForm);
  };

  const handleChange = ({ target }) => {
    setUpdateForm({
      ...updateForm,
      [target.name]: target.value,
    });
  };

  return (
    <form>
      <UpdateForm
        columns={primaryKey}
        handleChange={handleChange}
        heading="Primary Key"
        isRequired={true}
        updateForm={updateForm}
      />
      <UpdateForm
        columns={remainingColums}
        handleChange={handleChange}
        heading="Other Colums"
        isRequired={false}
        updateForm={updateForm}
      />

      <div className="control-section">
        <Button variant="primary " onClick={handleRowUpdate}>
          Update
        </Button>
      </div>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    tableinfo: state.table.tableinfo,
    updateTableForm: state.table.updateTableForm,
  };
}
const mapDispatchToProps = {
  updateRow,
  executeQuery,
};
export default connect(mapStateToProps, mapDispatchToProps)(Update);
