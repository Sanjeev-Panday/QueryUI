import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlug,
  faWifi,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../common/Loader";
const Connection = (props) => {
  const handler = (index) => {
    props.isConnected
      ? props.handleDisconnect(index)
      : props.handleConnect(index);
  };
  const handleDelete = (name) => {
    props.handleDelete(name);
  };
  return (
    <div className="card">
      <div className="card-title card-header">
        <h5>{props.connectionName}</h5>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{`${props.host} : ${props.port}`}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{`DataCenter : ${props.datacenter}`}</h6>
      </div>
      <div className="card-footer">
        <div className="connect-db" onClick={() => handler(props.index)}>
          <FontAwesomeIcon icon={props.isConnected ? faWifi : faPlug} />
        </div>
        {!props.isConnected && (
          <div
            className="delete-connection"
            onClick={() => handleDelete(props.connectionName)}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Connection;
