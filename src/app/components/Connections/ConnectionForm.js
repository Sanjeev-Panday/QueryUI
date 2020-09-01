import React from "react";
import TextInput from "../common/TextInput";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const ConnectionForm = ({ show, db, onChange, error, onSaveConnection }) => {
  return (
    <Modal show={show} aria-labelledby="exampleModalCenterTitle" centered>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLongTitle">New Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <TextInput
            type="text"
            label="Connection Name"
            id="connectionName"
            name="connectionName"
            value={db.connectionName}
            onChange={onChange}
            size="col-md-12"
            error={error && error.connectionName}
            isRequired={true}
          />
          <TextInput
            label="Host"
            id="host"
            name="host"
            value={db.host}
            onChange={onChange}
            size="col-md-12"
            error={error && error.host}
            isRequired={true}
          />
          <TextInput
            id="port"
            name="port"
            label="PORT"
            value={db.port}
            onChange={onChange}
            size="col-md-3"
            error={error && error.port}
            isRequired={true}
          />
          <TextInput
            label="DataCenter"
            id="datacenter"
            name="datacenter"
            value={db.datacenter}
            onChange={onChange}
            size="col-md-12"
            error={error.datacenter}
            isRequired={true}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSaveConnection} data-dismiss="modal">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConnectionForm.propTypes = {
  show: PropTypes.bool.isRequired,
  db: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  onSaveConnection: PropTypes.func.isRequired,
};

export default ConnectionForm;
