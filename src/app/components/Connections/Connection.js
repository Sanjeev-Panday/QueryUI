import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlug,
  faWifi,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

const Connection = ({ handleConnection, handleDelete, db }) => {
  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        {db.connectionName}
      </Card.Header>
      <Card.Body>
        <Card.Subtitle
          className="mb-2 text-muted"
          as="h6"
        >{`${db.host} : ${db.port}`}</Card.Subtitle>
        <Card.Subtitle
          className="mb-2 text-muted"
          as="h6"
        >{`DataCenter : ${db.datacenter}`}</Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        <div className="connect-db" onClick={() => handleConnection(db)}>
          <FontAwesomeIcon icon={db.isConnected ? faWifi : faPlug} />
        </div>
        {!db.isConnected && (
          <div
            className="delete-connection"
            onClick={() => handleDelete(db.connectionName)}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};

Connection.propTypes = {
  handleConnection: PropTypes.func.isRequired,
  db: PropTypes.object.isRequired,
};

export default Connection;
