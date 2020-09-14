import React from "react";
import { connect } from "react-redux";
import Query from "../Query/Query";
import Update from "../Update/Update";
const Form = ({ formType }) => {
  return formType && formType === "update" ? <Update /> : <Query />;
};

function mapStateToProps(state) {
  return {
    formType: state.table.formType,
  };
}
export default connect(mapStateToProps)(Form);
