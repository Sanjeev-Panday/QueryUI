import React from "react";
import Connection from "./Connection";
import ConnectionForm from "./ConnectionForm";
import { connect } from "react-redux";
import {
  connectToDB,
  disconnectFromDB,
  loadConnections,
  addConnection,
  deleteConnection,
} from "../../../redux/actions/dbActions";
import { resetTableData } from "../../../redux/actions/tableActions";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./css/Connection.css";
class ManageConnections extends React.Component {
  state = {
    show: false,
    connection: {
      connectionName: "",
      host: "",
      port: "",
      datacenter: "",
      keyspaces: [],
      isConnected: false,
    },
    error: {},
  };

  handleDelete = (name) => {
    this.props.deleteConnection(name);
  };

  handleDisconnect = (index) => {
    const con = this.props.connections[index];
    this.props.disconnectFromDB(con);
    this.props.resetTableData();
  };

  handleConnection = (db) => {
    if (db.isConnected) this.props.disconnectFromDB(db);
    else this.props.connectToDB(db);
  };

  componentDidMount() {
    this.refreshConnections();
  }
  refreshConnections = () => {
    this.props.loadConnections();
  };
  handleChange = ({ target }) => {
    let newState = { ...this.state.connection, [target.name]: target.value };
    this.setState({
      ...this.state,
      connection: newState,
    });
  };
  // Create Model to capture connection details
  handleAddConneciton = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, show: true });
  };
  validateForm = (error, data) => {
    if (!data.connectionName)
      error["connectionName"] = `Connection name is required`;
    if (!data.host) {
      error["host"] = `Host name is required`;
    }
    if (!data.port) {
      error["port"] = `Port is required`;
    }

    if (!data.datacenter) {
      error["datacenter"] = `Datacenter is required. 
      If you don't know the datacenter. Try with datacenter1 and pay close attention to the error message while connecting. You will get the correct datacenter name in the error message`;
    }
  };
  // Handle the Connect event to connect to the DB
  // This also dispatches actions to redux store
  handleSaveConnection = (event) => {
    event.preventDefault();
    const error = {};
    this.validateForm(error, this.state.connection);
    const isValid = Object.keys(error).length === 0;
    this.setState({ ...this.state, show: !isValid, error });
    if (Object.keys(error).length > 0) return;
    this.props.addConnection({
      ...this.state.connection,
    });
  };

  render() {
    return (
      <div id="connections">
        <h4>Connections</h4>
        {this.props.connections &&
          this.props.connections.map((elem, index) => (
            <Connection
              handleConnection={this.handleConnection}
              key={elem.connectionName}
              db={elem}
              handleDelete={this.handleDelete}
            />
          ))}
        <i
          onClick={this.handleAddConneciton}
          className="add-connection"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </i>
        <ConnectionForm
          onHide={() =>
            this.setState({ ...this.state, show: false, error: {} })
          }
          show={this.state.show}
          db={this.state.connection}
          onChange={this.handleChange}
          onSaveConnection={this.handleSaveConnection}
          error={this.state.error}
        />
      </div>
    );
  }
}
ManageConnections.propTypes = {
  connectToDB: PropTypes.func.isRequired,
  disconnectFromDB: PropTypes.func.isRequired,
  loadConnections: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired,
  resetTableData: PropTypes.func.isRequired,
  connections: PropTypes.array.isRequired,
};
function mapStateToProps(state, ownProps) {
  return {
    connections: state.db.connections,
  };
}

const mapDispatchToProps = {
  connectToDB,
  disconnectFromDB,
  loadConnections,
  resetTableData,
  addConnection,
  deleteConnection,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageConnections);
