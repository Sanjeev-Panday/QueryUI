import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
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
        <h6 className="card-subtitle mb-2 text-muted">{`DataCenter : ${props.datacenter}`}</h6>
        <i className="connect-db" onClick={() => handler(props.index)}>
          {props.isConnected ? "Disconnect" : <FontAwesomeIcon icon={faPlug} />}
        </i>
        <FontAwesomeIcon icon="check-square" />
      </div>
    </div>
  );
};
export default Connection;
