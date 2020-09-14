import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmDelete = ({ show, hideMessage, handleConfirmation }) => {
  return (
    <Modal
      show={show}
      aria-labelledby="exampleModalCenterError"
      onHide={hideMessage}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete the connection ?</Modal.Body>
      <hr />
      <Modal.Footer>
        <Button variant="secondary" onClick={hideMessage}>
          No
        </Button>
        <Button variant="primary" onClick={handleConfirmation}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDelete;
