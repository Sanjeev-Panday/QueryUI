import React from "react";
import TextInput from "../common/TextInput";
import Modal from "react-bootstrap/Modal";
const ConnectionForm = (props) => {
  return (
    <Modal {...props} aria-labelledby="exampleModalCenterTitle" centered>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLongTitle">New Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.onSave}>
          <TextInput
            type="text"
            label="Connection Name"
            id="connectionName"
            name="connectionName"
            value={props.connection.connectionName}
            onChange={props.onChange}
            size="col-md-12"
          />
          <TextInput
            label="Host"
            id="host"
            name="host"
            value={props.connection.host}
            onChange={props.onChange}
            size="col-md-12"
          />

          <TextInput
            id="port"
            name="port"
            label="PORT"
            value={props.connection.port}
            onChange={props.onChange}
            size="col-md-3"
          />

          <TextInput
            label="DataCenter"
            id="datacenter"
            name="datacenter"
            value={props.connection.datacenter}
            onChange={props.onChange}
            size="col-md-12"
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={props.onSave}
          type="button"
          className="btn btn-primary"
          data-dismiss="modal"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectionForm;
