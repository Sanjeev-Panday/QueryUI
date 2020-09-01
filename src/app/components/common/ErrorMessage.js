import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { hideErrorMessage } from "../../../redux/actions/errorActions";
import PropTypes from "prop-types";

const ErrorMessage = ({ error, hideErrorMessage }) => {
  return (
    <Modal
      show={error.show}
      aria-labelledby="exampleModalCenterError"
      onHide={() => hideErrorMessage()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{error.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error.msg}</Modal.Body>
      <hr />
      <Modal.Footer>
        <Button variant="success" onClick={() => hideErrorMessage()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    error: state.error,
  };
}

const mapDispatchToProps = {
  hideErrorMessage,
};

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
  hideErrorMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
