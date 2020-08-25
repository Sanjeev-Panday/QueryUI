import React from "react";

const Connection = (props) => {
  const handler = (index) => {
    props.isConnected
      ? props.handleDisconnect(index)
      : props.handleConnect(index);
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.connectionName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{`${props.host} : ${props.port}`}</h6>
        <button
          className="btn btn-primary"
          onClick={() => handler(props.index)}
        >
          {props.isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
};
export default Connection;
