import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlug,
  faWifi,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
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
        <OverlayTrigger
          trigger="hover"
          placement="left"
          delay={{ show: 150, hide: 400 }}
          overlay={
            <Tooltip id="connect-button-tooltip">
              {db.isConnected ? "Disconnect" : "Connect"}
            </Tooltip>
          }
        >
          <div className="connect-db" onClick={() => handleConnection(db)}>
            <FontAwesomeIcon icon={db.isConnected ? faWifi : faPlug} />
          </div>
        </OverlayTrigger>
        {!db.isConnected && (
          <OverlayTrigger
            trigger="hover"
            placement="left"
            delay={{ show: 100, hide: 400 }}
            overlay={<Tooltip id="delete-button-tooltip">Delete</Tooltip>}
          >
            <div
              className="delete-connection"
              onClick={() => handleDelete(db.connectionName)}
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </div>
          </OverlayTrigger>
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
