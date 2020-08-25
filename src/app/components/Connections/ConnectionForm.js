import React from "react";
import TextInput from "./TextInput";
const ConnectionForm = (props) => {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              New Connection
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={props.onSave}>
              <TextInput
                type="text"
                label="Connection Name"
                id="connectionName"
                name="connectionName"
                value={props.connection.connectionName}
                onChange={props.onChange}
              />
              <TextInput
                label="Host"
                id="host"
                name="host"
                value={props.connection.host}
                onChange={props.onChange}
              />

              <TextInput
                id="port"
                name="port"
                label="PORT"
                value={props.connection.port}
                onChange={props.onChange}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Test
            </button>
            <button
              onClick={props.onConnect}
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionForm;
