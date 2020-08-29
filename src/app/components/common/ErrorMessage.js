import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as errorActions from "../../../redux/actions/errorActions";
import { bindActionCreators } from "redux";
const ErrorMessage = (props) => {
  const hideMessage = () => {
    console.log();
    props.errors.hideErrorMessage();
  };

  return (
    <Modal
      show={props.error.show}
      aria-labelledby="exampleModalCenterError"
      onHide={hideMessage}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.error.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.error.msg}</Modal.Body>
      <hr />
      <Modal.Footer>
        <Button variant="success" onClick={hideMessage}>
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

function mapDispatchToProps(dispatch) {
  return {
    errors: bindActionCreators(errorActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
