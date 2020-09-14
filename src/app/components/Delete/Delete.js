import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import {
  deleteSelectedRow,
  hideConfirmationMessage,
} from "../../../redux/actions/tableActions";
const Delete = ({ operation, hideConfirmationMessage, deleteSelectedRow }) => {
  const handleConfirmation = (event) => {
    event.preventDefault();
    deleteSelectedRow();
  };
  const hideMessage = () => {
    hideConfirmationMessage();
  };
  return (
    <Modal
      show={operation === "delete"}
      aria-labelledby="exampleModalCenterError"
      onHide={() => hideMessage()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete the selected row!</Modal.Body>
      <hr />
      <Modal.Footer>
        <Button variant="secondary" onClick={() => hideMessage()}>
          No
        </Button>
        <Button variant="primary" onClick={handleConfirmation}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    operation: state.table.operation,
  };
}
const mapDispatchToProps = {
  deleteSelectedRow,
  hideConfirmationMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Delete);
